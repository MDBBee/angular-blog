/**
 * Dashboard Utility Functions
 * Helper functions for the admin dashboard
 */

export const dashboardUtils = {
  /**
   * Format large numbers with K, M, B suffixes
   */
  formatNumber(num: number): string {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  },

  /**
   * Format date to readable string
   */
  formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  },

  /**
   * Format percentage
   */
  formatPercentage(value: number, decimals: number = 1): string {
    return value.toFixed(decimals) + '%';
  },

  /**
   * Get color based on value range
   */
  getStatusColor(value: number, threshold: number = 50): string {
    if (value >= threshold) return 'text-green-400';
    if (value >= threshold / 2) return 'text-yellow-400';
    return 'text-red-400';
  },

  /**
   * Generate random color
   */
  generateRandomColor(): string {
    const colors = [
      'rgba(59, 130, 246, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(236, 72, 153, 0.8)',
      'rgba(34, 197, 94, 0.8)',
      'rgba(251, 146, 60, 0.8)',
      'rgba(14, 165, 233, 0.8)',
      'rgba(168, 85, 247, 0.8)',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  },

  /**
   * Get contrasting text color
   */
  getContrastColor(hexColor: string): string {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  },

  /**
   * Debounce function
   */
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Calculate growth percentage
   */
  calculateGrowth(current: number, previous: number): number {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  },

  /**
   * Get time range label
   */
  getTimeRangeLabel(days: number): string {
    if (days === 7) return 'Last 7 days';
    if (days === 30) return 'Last 30 days';
    if (days === 90) return 'Last 90 days';
    if (days === 365) return 'Last year';
    return `Last ${days} days`;
  },
};
