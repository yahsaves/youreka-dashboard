interface Page {
  name: string;  
  icon: string;
}

interface FocusPage {
  pages: Page[];
  focusPage: string;
}

interface Account {
  Id: string;
  Name: string;
  AnnualRevenue?: number;
  Website?: string;
  AccountNumber?: string;
  Rating?: string;
  UpsellOpportunity__c?: string,
  Contacts: any;
}


export type { Page, FocusPage, Account }