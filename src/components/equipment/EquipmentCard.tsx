import { Equipment } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ShieldCheck, User, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function EquipmentCard({ equipment }: { equipment: Equipment }) {
  const getPricingText = () => {
    if (equipment.pricingModel === "quote") return "Request Quote";
    if (equipment.pricingModel === "fixed") return `From $${equipment.price}`;
    return `From $${equipment.price}/${equipment.pricingModel === "per_day" ? "day" : "hr"}`;
  };

  return (
    <Card className="overflow-hidden rounded-[2rem] hover:shadow-xl transition-all duration-300 border-slate-200 group h-full flex flex-col">
      <div className="relative h-48 sm:h-56 w-full bg-slate-100 overflow-hidden">
        <Image
          src={equipment.image} 
          alt={equipment.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {equipment.verified && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 flex items-center gap-1 rounded-md text-xs font-semibold text-blue-600 shadow-sm">
            <ShieldCheck className="h-3 w-3" />
            Verified
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 flex items-center gap-1 rounded-md text-xs font-bold shadow-sm">
          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
          {equipment.rating.toFixed(1)} <span className="text-muted-foreground font-normal">({equipment.reviewCount})</span>
        </div>
      </div>
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-heading font-bold text-xl text-[#132238] line-clamp-2 leading-tight">{equipment.name}</h3>
          </div>
          <div className="font-bold text-amber-600 text-lg">{getPricingText()}</div>
          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
            <MapPin className="h-4 w-4 text-slate-400" />
            {equipment.location}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-0">
            {equipment.category}
          </Badge>
          <Badge variant="outline" className="text-muted-foreground border-border">
            {equipment.condition} Condition
          </Badge>
          {equipment.operatorAvailable && (
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
              <User className="h-3 w-3 mr-1" /> Operator
            </Badge>
          )}
          {equipment.deliveryAvailable && (
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
              <Truck className="h-3 w-3 mr-1" /> Delivery
            </Badge>
          )}
        </div>

        <div className="flex gap-3 pt-4 mt-auto border-t border-slate-100">
          <Button nativeButton={false} render={<Link href={`/equipment/${equipment.id}`} />} className="flex-1 bg-[#132238] hover:bg-[#132238]/90 text-white rounded-xl h-11 font-semibold">
            View Details
          </Button>
          <Button nativeButton={false} render={<Link href={`/request?equipment=${equipment.id}`} />} variant="outline" className="flex-1 border-[#132238]/20 hover:bg-[#132238]/5 text-[#132238] rounded-xl h-11 font-semibold">
            Request Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
