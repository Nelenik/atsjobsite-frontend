import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"

interface IFunnelCard {
  name: string
  count: number
}
const FunnelCard = ({ name, count }: IFunnelCard) => {
  return (
    <Card className="w-full py-4 px-6 flex flex-col items-center">
      <CardTitle className="mb">{name}</CardTitle>
      <CardDescription>{count}</CardDescription>
    </Card>
  );
}

export default FunnelCard;