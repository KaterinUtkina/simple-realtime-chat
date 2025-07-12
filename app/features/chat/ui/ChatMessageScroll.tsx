"use client"
import {ReactNode, useCallback, useEffect, useRef} from 'react';
import {OverlayScrollbarsComponent, OverlayScrollbarsComponentRef} from "overlayscrollbars-react";
import {eventBus} from "@/app/shared/services/EventBus";
import {ChatEvents} from "@/app/features/chat/enum";

type CustomScrollProps = {
  children: ReactNode,
}

const ChatMessageScroll = (
  props: CustomScrollProps
) => {
  const ref = useRef<OverlayScrollbarsComponentRef>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollContent = () => {
    const { current } = ref;
    const osInstance = current?.osInstance();

    if (!osInstance) {
      return;
    }

    const { scrollOffsetElement } = osInstance.elements();

    scrollOffsetElement.scrollTo({
      top: scrollOffsetElement.scrollHeight ?? 0,
    });
  };

  const initEvents = useCallback(() => {
    eventBus.on(ChatEvents.OPTIONS_RENDERED, scrollContent);
  }, []);

  const destroyEvents = useCallback(() => {
    eventBus.off(ChatEvents.OPTIONS_RENDERED, scrollContent);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      scrollContent();
    }

  }, [props.children]);

  useEffect(() => {
    initEvents();

    return () => {
      destroyEvents();
    }
  }, [destroyEvents, initEvents]);

  return (
    <OverlayScrollbarsComponent
      ref={ref}
      style={{ height: "100%" }}
      defer>
      <div ref={contentRef}>
        {props.children}
      </div>
    </OverlayScrollbarsComponent>
  );
};

export default ChatMessageScroll;
