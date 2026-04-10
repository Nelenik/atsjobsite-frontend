
type TProps = {
  userName: string;
}
export const Greeting = ({ userName }: TProps) => {
  return (
    <p className="text-4xl font-bold text-center text-foreground dark:text-white">
      <span className="mb-4 inline-block">
        Wellcome,&nbsp;
      </span>
      <br />
      <span className="uppercase bg-gradient-to-tr from-blue-900 from-0% via-blue-700 via-50% to-blue-400 to-100% bg-clip-text text-transparent">
        {userName}
      </span>
    </p>
  );
}