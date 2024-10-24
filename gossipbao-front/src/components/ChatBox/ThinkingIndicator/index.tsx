import { Row, Gap, Col } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { Avatar } from "@mui/material";
import { BOT_INFO } from "@/config";
import { PulseBox } from "@/ui/tools/PulseBox";

export function ThinkingIndicator() {
  return (
    <Row
      mt={1}
      alignItems='flex-start'
      sx={{
        opacity: 0.6,
      }}
    >
      <Avatar
        src={BOT_INFO.thumbnail}
        alt={BOT_INFO.name}
      />
      <Gap x={1} />
      <Col width='100%'>
        <Row alignItems='center'>
          <Txt variant='body3' fontWeight={500}>{BOT_INFO.name}</Txt>
        </Row>
        <PulseBox
          minScale={0.9}
          bgcolor='paper.main'
          width='fit-content'
          p={1}
          borderRadius={2}
        >
          <Txt variant='body2'>🤔 생각중...</Txt>
        </PulseBox>
      </Col>
    </Row>
  );
}