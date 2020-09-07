export interface CompanyData {
    id: number;
    industry_id?: any;
    company_name: string;
    logo: string;
    slug: string;
    created_on: Date;
    updated_on: Date;
    website: string;
    city: string;
    address: string;
    contact_number?: string;
    facebook?: any;
    twitter?: any;
    linkedin: string;
    custom_fields: any[];
    created_by: number;
    updated_by: number;
    owner: number;
    resource_url: string;
}

export interface Company {
    current_page: number;
    data: CompanyData[];
    first_page_url: string;
    from: number;
    next_page_url?: any;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
}