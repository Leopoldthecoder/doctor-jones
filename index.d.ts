export as namespace dj;

export = DoctorJones;

declare function DoctorJones(input: string, options?: DoctorJones.DoctorJonesFormatOptions): string;

declare namespace DoctorJones {
  export type DoctorJonesFormatOptions = {
    spacing?: boolean,
    spaceBetweenFullwidthPunctuationAndAlphabets?: boolean,
    successiveExclamationMarks?: boolean,
    ellipsisTolerance?: 'none' | '3dots' | 'all',
    replaceWithCornerQuotes?: 'double' | 'single' | 'none',
    halfwidthParenthesisAroundNumbers?: boolean
  }
}
