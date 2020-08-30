export interface ContactData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    contact_number: string;
    avatar?: any;
    slug: string;
    company_slug: string;
    facebook?: any;
    twitter?: any;
    linkedin?: any;
    created_on: Date;
    updated_on: Date;
    city: string;
    locality: string;
    address: string;
    designation: string;
    stage_id: number;
    custom_fields: any[];
    created_by: number;
    updated_by: number;
    owner: number;
    resource_url: string;
}

export interface Contact {
    current_page?: number;
    data?: ContactData[];
    first_page_url?: string;
    from?: number;
    next_page_url?: any;
    path?: string;
    per_page?: number;
    prev_page_url?: any;
    to?: number;
}