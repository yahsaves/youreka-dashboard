interface Page {
  name: string;  
  icon: string;
}

interface FocusPage {
  pages: Page[];
  focusPage: string;
}

export type { Page, FocusPage }