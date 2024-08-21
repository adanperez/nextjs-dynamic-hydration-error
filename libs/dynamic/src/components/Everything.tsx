import { DynamicDiv } from './DynamicDiv';
import { DynamicHeader } from './DynamicHeader';

export function Everything() {
  return (
    <div>
      <DynamicDiv>
        <DynamicHeader />
      </DynamicDiv>
    </div>
  );
}
