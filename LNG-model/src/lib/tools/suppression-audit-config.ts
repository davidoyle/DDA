export const questions = [
  { id: 1, group: 'Reporting Culture', weight: 4, prompt: 'Written all-injury reporting policy?', options: ['Yes', 'No', 'In progress'], risk: [0, 4, 2] },
  { id: 2, group: 'Reporting Culture', weight: 8, prompt: 'Any claim discouragement by leaders?', options: ['Never', 'Rarely', 'Sometimes', 'Regularly'], risk: [0, 3, 6, 8] },
  { id: 3, group: 'Reporting Culture', weight: 4, prompt: 'Claims used as supervisor KPI?', options: ['No', 'Yes — informally', 'Yes — explicitly'], risk: [0, 2, 4] },
  { id: 4, group: 'Reporting Culture', weight: 4, prompt: 'Concerns raised in surveys/exit interviews?', options: ['No', 'Yes', "Don't know"], risk: [0, 4, 2] },
  { id: 5, group: 'Claims Handling', weight: 3, prompt: 'Who initiates claim filing?', options: ['Employee always', 'HR/safety team', 'Supervisor initiates', 'No defined process'], risk: [0, 1, 2, 3] },
  { id: 6, group: 'Claims Handling', weight: 8, prompt: 'Incentives tied to low claim counts?', options: ['No', 'Yes'], risk: [0, 8] },
  { id: 7, group: 'Claims Handling', weight: 4, prompt: 'Modified duties used to avoid filing?', options: ['No', 'Yes, informally', 'Yes, formally'], risk: [0, 2, 4] },
  { id: 8, group: 'Claims Handling', weight: 8, prompt: 'Past audits/orders/Section 73 findings?', options: ['No', 'Yes', "Don't know"], risk: [0, 8, 4] },
  { id: 9, group: 'Experience Rating Awareness', weight: 3, prompt: 'Leadership monitors NEER/retro?', options: ['Yes, quarterly', 'Yes, annually', 'No'], risk: [0, 1, 3] },
  { id: 10, group: 'Experience Rating Awareness', weight: 8, prompt: 'Experience rating discussed in filing decisions?', options: ['No', 'Yes', "Don't know"], risk: [0, 8, 4] },
  { id: 11, group: 'Experience Rating Awareness', weight: 3, prompt: 'Third-party claims manager used?', options: ['No', 'Yes'], risk: [0, 2] },
  { id: 12, group: 'Experience Rating Awareness', weight: 3, prompt: 'If yes, briefed on discouragement policy?', options: ['Yes', 'No', 'Not applicable'], risk: [0, 3, 0] },
  { id: 13, group: 'Incident Investigation', weight: 4, prompt: 'Formal investigations for all injuries?', options: ['Yes, all', 'Yes, lost-time only', 'No'], risk: [0, 2, 4] },
  { id: 14, group: 'Incident Investigation', weight: 3, prompt: 'Reports shared with injured worker?', options: ['Always', 'Sometimes', 'Never'], risk: [0, 1, 3] },
  { id: 15, group: 'Incident Investigation', weight: 4, prompt: 'Worker complaints to WCB about claim handling?', options: ['No', 'Yes', "Don't know"], risk: [0, 4, 2] },
] as const;

export const scoreBands = [
  { max: 25, label: 'Low' },
  { max: 50, label: 'Elevated' },
  { max: 75, label: 'High' },
  { max: 100, label: 'Critical' },
] as const;
