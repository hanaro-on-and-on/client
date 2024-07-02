// BLACK("01"), RED("02"), GREEN("03"), YELLOW("04"), BLUE("05"), MAGENTA("06"), WHITE("07");

// type getColorFunction = (colorType: string, label: 'BG' | 'TEXT') => string;

export function getColor(
  colorType: string,
  label: 'BG' | 'TEXT' | undefined = 'BG'
): string {
  let baseColor: string;

  switch (colorType) {
    case '01':
      baseColor = 'red-400';
      break;
    case '02':
      baseColor = 'lime-500';
      break;
    case '03':
      baseColor = 'yellow-200';
      break;
    case '04':
      baseColor = 'blue-300';
      break;
    case '05':
      baseColor = 'emerald-400';
      break;
    case '06':
      baseColor = 'slate-300';
      break;
    case '07':
      baseColor = 'cyan-200';
      break;
    case '08':
      baseColor = 'pink-300';
      break;
    case '09':
      baseColor = 'fuchsia-400';
      break;
    case '10':
      baseColor = 'violet-300';
      break;
    default:
      baseColor = 'hanaLightGreen';
  }

  if (label === 'TEXT') {
    return `text-${baseColor}`;
  }
  return `bg-${baseColor}`;
}
