import React, { FC, useState } from 'react';
import { cn } from '../../lib/cn';
import { Button, DatePicker, Form, Popconfirm, Typography } from 'antd';
import { mockKnowledges, useSetKnowledges } from '../knowledge';
import { ImportOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useCurrentDate } from '../../store';

interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
}

const Header: FC<IHeaderProps> = ({className, ...props}) => {
  const { mutate: setKnowledges } = useSetKnowledges();
  // const [ currentDate, setCurrentDate ] = useState(dayjs());
  const { currentDate, setCurrentDate } = useCurrentDate();

  const handleOnImportClick = () => {
    setKnowledges({ data: mockKnowledges });
  }

  return (
    <header className={cn("bg-white border-b-2 border-gray-200 h-[50px] w-full flex items-center px-4", className)} {...props}>
        <Typography.Title level={4} className="mb-0">FSRS demo</Typography.Title>
        <div className='grow'></div>
        <Form.Item label="Текущая дата" className='mb-0 mr-4'><DatePicker value={dayjs(currentDate)} onChange={(date) => setCurrentDate(date.toDate())} /></Form.Item>
        <Popconfirm
            title="Импортировать карточки?"
            description="Все существующие сейчас карточки будут удалены!"
            onConfirm={handleOnImportClick}
            okText="Да"
            cancelText="Нет"
            placement="bottomRight"
        >
          <Button type='primary' icon={<ImportOutlined />}>Импортировать карточки</Button>
        </Popconfirm>
    </header>
  )
}

export interface ILayoutProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const Layout: FC<ILayoutProps> = ({children, className, ...props}) => {
  return (
    <div className={cn('w-full', className)} {...props}>
      <Header />
      <main className='p-4'>{children}</main>
    </div>
  )
}