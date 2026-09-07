export function filterEntries(entries, { query = '', collection = 'all', mode = '', status = '', tag = '', sort = 'newest', favorites = [] } = {}) {
  const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return entries.filter(entry => {
    const haystack = [entry.title, entry.mode, entry.type, entry.content, entry.notes, ...(entry.tags || [])].join(' ').toLocaleLowerCase();
    return words.every(word => haystack.includes(word))
      && (collection === 'all' || (collection === 'favorites' ? favorites.includes(entry.slug) : entry.collection === collection))
      && (!mode || entry.mode === mode || entry.type === mode)
      && (!status || entry.status === status)
      && (!tag || (entry.tags || []).includes(tag));
  }).sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title) : sort === 'oldest' ? (a.date || '').localeCompare(b.date || '') : (b.date || '').localeCompare(a.date || '') || a.title.localeCompare(b.title));
}

export function promptSections(content = '') {
  const names = 'subject_definitions|summary|retention_analysis|detailed_description|integrated_multimodal_description|overall_soundscape|non_diegetic_music';
  const matches = [...content.matchAll(new RegExp(`^(${names}):[ \\t]*`, 'gm'))];
  if (!matches.length) return [{ name: 'Prompt', content }];
  const sections = [];
  const alignment = content.slice(0, matches[0].index).trim();
  if (alignment) sections.push({ name: 'Reference alignment', content: alignment });
  matches.forEach((match, i) => sections.push({ name: match[1], content: content.slice(match.index + match[0].length, matches[i + 1]?.index ?? content.length).trim() }));
  return sections;
}
