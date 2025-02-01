/**
 * Badge component props
 */
export default interface IBadge {
  text: string;
  type: 'error' | 'info' | 'warning' | 'success' | 'secondary';
}
