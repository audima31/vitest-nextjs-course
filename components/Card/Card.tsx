import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface CardProps {
  children: React.ReactNode;
  link?: string;
}

export default function Card({ children, link }: CardProps) {
  return (
    <div className="card">
      {children}
      {link && (
        <Link href={link} className="card-link">
          <span>More</span>
          <ChevronRight className="card-chevron" size={16} />
        </Link>
      )}
    </div>
  );
}
