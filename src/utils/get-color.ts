// BLACK("01"), RED("02"), GREEN("03"), YELLOW("04"), BLUE("05"), MAGENTA("06"), WHITE("07");

export function getColor(colorType: string) {
  switch (colorType) {
    case '01':
      return 'bg-red-200';
    case '02':
      return 'bg-lime-200';
    case '03':
      return 'bg-yellow-200 ';
    case '04':
      return 'bg-blue-100';
    case '05':
      return 'bg-emerald-200';
    case '06':
      return 'bg-slate-200';
    case '07':
      return 'bg-cyan-200';
    case '08':
      return 'bg-pink-100';
    case '09':
      return 'bg-fuchsia-100';
    case '10':
      return 'bg-violet-100';
    default:
      return 'bg-violet-200';
  }
}

export function getTextColor(colorType: string) {
  switch (colorType) {
    case '01':
      return 'text-red-200';
    case '02':
      return 'text-lime-200';
    case '03':
      return 'text-yellow-200 ';
    case '04':
      return 'text-blue-100';
    case '05':
      return 'text-emerald-200';
    case '06':
      return 'text-slate-200';
    case '07':
      return 'text-cyan-200';
    case '08':
      return 'text-pink-100';
    case '09':
      return 'text-fuchsia-100';
    case '10':
      return 'text-violet-100';
    default:
      return 'text-violet-200';
  }
}

export function getBorderColor(colorType: string) {
  switch (colorType) {
    case '01':
      return 'border-red-200';
    case '02':
      return 'border-lime-200';
    case '03':
      return 'border-yellow-200 ';
    case '04':
      return 'border-blue-100';
    case '05':
      return 'border-emerald-200';
    case '06':
      return 'border-slate-200';
    case '07':
      return 'border-cyan-200';
    case '08':
      return 'border-pink-100';
    case '09':
      return 'border-fuchsia-100';
    case '10':
      return 'border-violet-100';
    default:
      return 'border-violet-200';
  }
}
