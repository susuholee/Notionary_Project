import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import BlockEditorcopy from '../newworkspace/BlockEditorcopy';
import { getBlockIdcontent } from '../../../API/Workspaceapi';
import { useQuery } from '@tanstack/react-query';

const SliderWrapper = styled.div`
  position: relative;
  width: 1200px;
  max-width: 1000px;
  height: 480px;
  margin: 0 auto;
  perspective: 1500px;
  overflow: visible;
  overflow:hidden;
  .Blockcontent{
    /* display: flex; */
    height: 480px;
    overflow-y: scroll;
  }
  .Blocks{
    width: 850px;
  }
`;

const Slide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  backface-visibility: hidden;
  transition: transform 0.9s ease, opacity 0.6s ease;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  transform-style: preserve-3d;

  ${({ position }) =>
    position === 'current' &&
    css`
      transform: rotateY(0deg) translateZ(0px);
      z-index: 3;
      opacity: 1;
    `}

  ${({ position }) =>
    position === 'prev' &&
    css`
      transform: rotateY(50deg) translateX(-60%) translateZ(-200px);
      z-index: 2;
      opacity: 0.5;
    `}

  ${({ position }) =>
    position === 'next' &&
    css`
      transform: rotateY(-50deg) translateX(60%) translateZ(-200px);
      z-index: 2;
      opacity: 0.5;
    `}

  ${({ position }) =>
    position === 'hidden' &&
    css`
      opacity: 0;
      z-index: 1;
      transform: translateX(100%) translateZ(-300px);
      pointer-events: none;
    `}
`;

const MediaContent = styled.div`
  width: 100%;
  height: 100%;
  video, img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    user-select: none;
  }
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.4);
  color: white;
  border: none;
  font-size: 32px;
  padding: 10px 16px;
  z-index: 10;
  cursor: pointer;
  border-radius: 50%;
  ${({ direction }) => (direction === 'left' ? 'left: 15px;' : 'right: 15px;')}

  &:hover {
    background: rgba(255,255,255,0.4);
    color: black;
  }
`;

const MediaSlider = ({ result_id, images = [], videos = [] }) => {
  const mediaItems = [
    ...images.map((url) => ({ type: 'image', url })),
    ...videos.map((url) => ({ type: 'video', url })),
  ];

  const [index, setIndex] = useState(0);
  const total = mediaItems.length;

  const prev = () => setIndex((prev) => (prev - 1 + total) % total);
  const next = () => setIndex((prev) => (prev + 1) % total);

  const { data, isLoading } = useQuery({
    queryKey: ["workspacePageData", result_id],
    queryFn: async () => {
      const data = await getBlockIdcontent(result_id)
      return data
      // const newPageBLocks = pageBlocks.reduce((acc,el) => {
      //   acc[el.id] = el
      //   return acc
      // })
      // setBlocks({...blocks, ...newPageBLocks})
    }
  })
  // useEffect(() => {

  //   console.log(data.workspacePageData.data, 'fffffffffffff`')

  // }, [data])
  const newData = data?.workspacePageData.data.data
  // console.log(Array.isArray(newData), 'newdataarray', newData)

  return (
    <SliderWrapper>
      {mediaItems.map((item, i) => {
        let position = 'hidden';
        if (i === index) position = 'current';
        else if (i === (index - 1 + total) % total) position = 'prev';
        else if (i === (index + 1) % total) position = 'next';

        return (
          <Slide key={i} position={position}>
            <MediaContent>
              {item.type === 'image' ? (
                <img src={item.url} alt={`media-${i}`} />
              ) : (
                <video src={item.url} autoPlay muted loop />
              )}
            </MediaContent>
          </Slide>
        );
      })}
      <Slide>

      <div className='Blockcontent'>
        {result_id ? newData?.map((el, index) => <div className='Blocks'><BlockEditorcopy key={index} el={el} /></div>) : null}
      </div>
      </Slide>
      {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
      {total > 1 && (
        <>
          <Arrow direction="left" onClick={prev}>‹</Arrow>
          <Arrow direction="right" onClick={next}>›</Arrow>
        </>
      )}
    </SliderWrapper>
  );
};

export default MediaSlider;
