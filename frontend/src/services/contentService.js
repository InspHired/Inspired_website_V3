import { supabase } from '../supabaseClient';

export const fetchPageContent = async (pageIdentifier) => {
  try {
    // Fetch Hero Section
    const { data: hero, error: heroError } = await supabase
      .from('page_heroes')
      .select('*')
      .eq('page_identifier', pageIdentifier)
      .single();

    // Fetch Subsection Headers
    const { data: sections, error: sectionsError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_identifier', pageIdentifier);

    if (heroError || sectionsError) throw new Error('Failed to load page structural text');

    return { hero, sections };
  } catch (error) {
    console.error(`Error loading content for ${pageIdentifier}:`, error);
    return null;
  }
};

export const fetchServicesPageData = async () => {
  try {
    const structural = await fetchPageContent('services');
    
    const { data: offerings, error: offeringsError } = await supabase
      .from('service_offerings')
      .select('*')
      .order('service_number', { ascending: true });

    const { data: screening, error: screeningError } = await supabase
      .from('verification_items')
      .select('*')
      .eq('page_source', 'services');

    if (offeringsError || screeningError) throw new Error('Error loading collections');

    return {
      ...structural,
      offerings,
      screening
    };
  } catch (error) {
    console.error('Error fetching Services page data:', error);
    return null;
  }
};