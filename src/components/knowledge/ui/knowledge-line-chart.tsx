import { Line, LineConfig } from "@ant-design/plots";
import { FC } from "react";
import { Knowledge } from "../types";
import { mapKnowledgeData } from "../lib/knowledge-chart-helpers";

export interface IKnowledgeLineChartProps extends React.HTMLAttributes<HTMLDivElement> {
    data: Knowledge[] | undefined,
}

export const KnowledgeLineChart: FC<IKnowledgeLineChartProps> = ({ data, ...props }) => {

    const chartData = data ? mapKnowledgeData(data) : [];

    const config: LineConfig = {
        data: chartData,
        xField: 'Дата повторения',
        yField: 'Интервал припоминания',
        point: {
          shapeField: 'Название карточки',
          sizeField: 4,
        },
        line: {
            colorField: 'Название карточки',
        },
        interaction: {
          tooltip: {
            marker: false,
          },
        },
        style: {
          lineWidth: 2,
        },
      };
      return <Line {...config} {...props} />;
}