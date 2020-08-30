export interface Resume {
    filename: string;
    file_link: string;
}

export interface CandidateData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    contact_number: string;
    gender_id: number;
    qualification_id: number;
    specialization: string;
    work_ex_year: number;
    candidate_dob?: any;
    current_salary: number;
    salary_expectation: number;
    resume: Resume;
    willing_to_relocate: number;
    current_organization: string;
    current_status?: any;
    notice_period: number;
    currency_id: number;
    slug: string;
    profile_update_link_status: number;
    profile_update_requested_on?: any;
    profile_updated_on?: any;
    avatar: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    github?: any;
    created_on: Date;
    updated_on: Date;
    city: string;
    locality: string;
    address: string;
    relevant_experience?: any;
    position: string;
    available_from?: any;
    salary_type?: any;
    source: string;
    language_skills?: any;
    skill: string;
    custom_fields: any[];
    created_by: number;
    updated_by: number;
    owner: number;
    resource_url: string;
}

export interface Candidate {
    current_page?: number;
    data?: CandidateData[];
    first_page_url?: string;
    from?: number;
    next_page_url?: any;
    path?: string;
    per_page?: number;
    prev_page_url?: any;
    to?: number;
}