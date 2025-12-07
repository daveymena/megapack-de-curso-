"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Gift } from "lucide-react";

interface MegaPackCardProps {
  pack: {
    id: number;
    title: string;
    icon: string;
    image: string;
    courses: string[];
    description?: string;
    bonus?: string;
    idealFor?: string[];
    subjects?: string[];
  };
  onClick: () => void;
}

export default function MegaPackCard({ pack, onClick }: MegaPackCardProps) {
  return (
    <Card 
      className="hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border-2 hover:border-blue-400" 
      onClick={onClick}
    >
      <div className="h-52 overflow-hidden relative">
        <img 
          src={pack.image} 
          alt={pack.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-5xl drop-shadow-lg">{pack.icon}</div>
        <Badge className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700">Pack {pack.id}</Badge>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight">{pack.title}</CardTitle>
        {pack.description && (
          <CardDescription className="text-sm">{pack.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          {pack.courses && pack.courses.length > 0 && pack.courses.slice(0, 3).map((course, index) => (
            <div key={index} className="flex items-start text-sm">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{course}</span>
            </div>
          ))}
          {pack.courses && pack.courses.length > 3 && (
            <div className="text-sm text-blue-600 font-medium">
              +{pack.courses.length - 3} cursos más...
            </div>
          )}
        </div>
        {pack.bonus && (
          <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
            <div className="flex items-start text-sm font-medium text-yellow-900">
              <Gift className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">Bonus: {pack.bonus}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
