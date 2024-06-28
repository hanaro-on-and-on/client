// BLACK("01"), RED("02"), GREEN("03"), YELLOW("04"), BLUE("05"), MAGENTA("06"), WHITE("07");

export function getColor(colorType: string) {
  switch (colorType) {
    case '01':
      return 'bg-red-400';
    case '02':
      return 'bg-lime-500';
    case '03':
      return 'bg-yellow-200 ';
    case '04':
      return 'bg-blue-300';
    case '05':
      return 'bg-emerald-400';
    case '06':
      return 'bg-slate-300';
    case '07':
      return 'bg-cyan-200';
    case '08':
      return 'bg-pink-300';
    case '09':
      return 'bg-fuchsia-400';
    case '10':
      return 'bg-violet-300';
    default:
      return 'bg-hanaLightGreen';
  }
}
