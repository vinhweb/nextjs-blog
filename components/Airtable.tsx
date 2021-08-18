import Airtable from 'airtable'
export default new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY })
    .base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID)
