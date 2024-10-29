/**
 *
 */
export const CancelIcon = ({ iconColor = "" } = {}) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<circle cx="8" cy="8" r="7" stroke="${iconColor ? iconColor : "currentColor"}" stroke-width="2"/>
<path d="M12.8 3.19995L3.19995 12.8" stroke="${iconColor ? iconColor : "currentColor"}" stroke-width="2"/>
</svg>
`;
};
