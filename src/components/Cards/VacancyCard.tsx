import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getWordEndings } from "@/utils/getWordEnding";
import { Badge } from "../ui/badge";

interface IVacancyCard {
  vacancyName: string,
  daysInProcessing: number,
  vacancyStatus: 'Настройка' | 'В работе' | 'На паузе' | 'Ожидание'
}

const VacancyCard = ({ vacancyName, daysInProcessing, vacancyStatus }: IVacancyCard) => {

  const daysString = `${daysInProcessing} ${getWordEndings(daysInProcessing, ['день', 'дня', 'дней'])}`

  const badgeColors = {
    'Настройка': 'bg-indigo-300 hover:bg-indigo-300/80',
    'В работе': 'bg-blue-300 hover:bg-blue-300/80',
    'На паузе': 'bg-gray-500 hover:bg-gray-300/80',
    'Ожидание': 'bg-emerald-400 hover:bg-emerald-300/80',
  }

  return (
    <Card className="w-full p-4">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">{vacancyName}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between p-0">
        {daysString}
        <Badge className={badgeColors[vacancyStatus]}>{vacancyStatus}</Badge>
      </CardFooter>
    </Card>
  );
}

export default VacancyCard;