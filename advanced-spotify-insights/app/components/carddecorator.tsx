import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function CardDecorator({ children }: Props) {
  return (
    <div className="transition-transform hover:scale-105 hover:-rotate-1 duration-300 cursor-pointer">
      {children}
    </div>
  );
}