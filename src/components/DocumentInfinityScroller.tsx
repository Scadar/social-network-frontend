import React, {FC, ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import usePrevious from '../hooks/usePrevious';
import {throttle} from 'throttle-debounce';

type DocumentInfinityScrollerProps = {
  next: () => void;
  hasMore: boolean;
  loader: ReactNode;
  endMessage?: ReactNode;
  dataLength: number;
  inverse?: boolean;
  scrollThreshold?: number
}

const DocumentInfinityScroller: FC<DocumentInfinityScrollerProps> = ({
                                                                       dataLength,
                                                                       endMessage,
                                                                       hasMore,
                                                                       inverse,
                                                                       loader,
                                                                       next,
                                                                       children,
                                                                       scrollThreshold = 1200,
                                                                     }) => {
  const [showLoader, setShowLoader] = useState(false);
  const actionTriggered = useRef(false);
  const scrollIsBottom = useRef(false);
  const prevDataLength = usePrevious(dataLength);

  const onScrollListener = useCallback(() => {

    scrollIsBottom.current = document.documentElement.scrollHeight - (
        document.documentElement.scrollTop +
        window.innerHeight
    ) === 0;

    if (actionTriggered.current) return;

    const isElementAtTop = () => {
      return (document.documentElement.scrollTop < scrollThreshold);
    };

    const isElementAtBottom = () => {
      return (
          document.documentElement.scrollHeight - (
              document.documentElement.scrollTop + window.innerHeight
          ) < scrollThreshold
      );
    };

    const isEdge = inverse ? isElementAtTop() : isElementAtBottom();
    if (isEdge && hasMore) {
      actionTriggered.current = true;
      setShowLoader(true);
      next();
    }
  }, [hasMore, inverse, next, scrollThreshold]);

  const throttledOnScrollListener = throttle(150, onScrollListener);

  useEffect(() => {
    window.addEventListener('scroll', throttledOnScrollListener);
    return () => {
      window.removeEventListener('scroll', throttledOnScrollListener);
    };
  }, [throttledOnScrollListener]);

  useEffect(() => {
    if (!inverse) return;
    if (scrollIsBottom.current) {
      document.documentElement.scrollTop = document.body.scrollHeight;
    }
  }, [scrollIsBottom, dataLength, inverse]);

  useEffect(() => {

    if (inverse && prevDataLength === 0) {
      document.documentElement.scrollTop = document.body.scrollHeight;
    }

    if (dataLength === prevDataLength) {
      return;
    }

    actionTriggered.current = false;
    setShowLoader(false);
  }, [dataLength, prevDataLength, inverse]);

  if (inverse && dataLength !== prevDataLength && document.documentElement.scrollTop === 0) {
    document.documentElement.scrollTop = 1;
  }

  return (
      <div
          style={inverse ? {display: 'flex', flexDirection: 'column-reverse'} : {}}
      >
        {children}
        {!showLoader && hasMore && loader}
        {showLoader && hasMore && loader}
        {!hasMore && endMessage}
      </div>
  );
};

export default DocumentInfinityScroller;
