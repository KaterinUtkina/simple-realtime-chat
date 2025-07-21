import { ReactNode, useEffect, useRef } from "react";
import {
  OverlayScrollbarsComponent,
  OverlayScrollbarsComponentRef,
} from "overlayscrollbars-react";

type CustomScrollProps = {
  children: ReactNode;
};

const ChatMessageScroll = (props: CustomScrollProps) => {
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

  useEffect(() => {
    if (contentRef.current) {
      scrollContent();
    }
  }, [props.children]);

  return (
    <OverlayScrollbarsComponent ref={ref} style={{ height: "100%" }} defer>
      <div ref={contentRef}>{props.children}</div>
    </OverlayScrollbarsComponent>
  );
};

export default ChatMessageScroll;
