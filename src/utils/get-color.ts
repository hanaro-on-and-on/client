// BLACK("01"), RED("02"), GREEN("03"), YELLOW("04"), BLUE("05"), MAGENTA("06"), WHITE("07");

// type getColorFunction = (colorType: string, label: 'BG' | 'TEXT') => string;

export function getColor(
  colorType: string,
  label: 'BG' | 'TEXT' | undefined = 'BG'
): string {
  let baseColor: string;

  switch (colorType) {
    case '01':
      baseColor = 'red-200';
      break;
    case '02':
      baseColor = 'lime-200';
      break;
    case '03':
      baseColor = 'yellow-200';
      break;
    case '04':
      baseColor = 'blue-100';
      break;
    case '05':
      baseColor = 'emerald-200';
      break;
    case '06':
      baseColor = 'slate-200';
      break;
    case '07':
      baseColor = 'cyan-200';
      break;
    case '08':
      baseColor = 'pink-100';
      break;
    case '09':
      baseColor = 'fuchsia-100';
      break;
    case '10':
      baseColor = 'violet-100';
      break;
    default:
      baseColor = 'violet-200';
  }

  if (label === 'TEXT') {
    return `text-${baseColor}`;
  }
  return `bg-${baseColor}`;
}
