import MobileUnsupportedScreen from './MobileUnsupportedScreen';

interface DesktopOnlyGateProps {
  children: React.ReactNode;
}

/**
 * スマートフォン等の狭い画面では案内画面を表示し、
 * PC向けコンテンツを非表示にする。
 */
export default function DesktopOnlyGate({ children }: DesktopOnlyGateProps) {
  return (
    <>
      <MobileUnsupportedScreen />
      <div className="max-md:hidden">{children}</div>
    </>
  );
}
