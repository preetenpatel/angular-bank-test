import { Component } from '@angular/core';

interface Transaction { icon: string; name: string; date: string; amount: string; order: number; }

@Component({ selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.scss'] })
export class AppComponent {
  query = '';
  activeNav = 'Home';
  selectedPeriod = 'Month';
  selectedTransaction = '';
  sortAscending = false;
  salaryAmount = 2000;
  salaryDraft = 2000;
  salaryEditorOpen = false;
  salaryError = '';
  periods = ['Day', 'Week', 'Month', 'Year'];
  periodTotals: { [key: string]: string } = { Day: '$840.00', Week: '$6,250.00', Month: '$25,999.00', Year: '$186,420.00' };
  navItems = [ { label: 'Home', icon: '⌂' }, { label: 'Cards', icon: '▤' }, { label: 'Messages', icon: '▣' }, { label: 'Profile', icon: '♙' }, { label: 'Transfers', icon: '⇧' }, { label: 'Settings', icon: '⚙' } ];
  transactions: Transaction[] = [
    { icon: '♔', name: 'Shopping', date: '05 Jun 2026 10:00', amount: '$300.00', order: 1 },
    { icon: '▧', name: 'Grocery', date: '12 Jun 2026', amount: '$45.00', order: 2 },
    { icon: '⚒', name: 'Gym', date: '23 Jun 2026', amount: '$125.00', order: 3 },
    { icon: '▤', name: 'Laundry', date: '27 Jun 2026 09:45', amount: '$90.00', order: 4 },
    { icon: '▣', name: 'Car Repair', date: '28 Jun 2026 10:20', amount: '$120.00', order: 5 }
  ];
  get filteredTransactions(): Transaction[] {
    const q = this.query.toLowerCase().trim();
    return this.transactions.filter(tx => !q || (tx.name + ' ' + tx.amount + ' ' + tx.date).toLowerCase().indexOf(q) >= 0)
      .sort((a, b) => this.sortAscending ? a.order - b.order : b.order - a.order);
  }
  toggleSort(): void { this.sortAscending = !this.sortAscending; }
  openSalaryEditor(): void { this.salaryDraft = this.salaryAmount; this.salaryError = ''; this.salaryEditorOpen = true; }
  closeSalaryEditor(): void { this.salaryEditorOpen = false; this.salaryError = ''; }
  saveSalary(): void {
    const amount = Number(this.salaryDraft);
    if (!isFinite(amount) || amount <= 0) { this.salaryError = 'Enter an amount greater than zero.'; return; }
    this.salaryAmount = Math.round(amount * 100) / 100;
    this.closeSalaryEditor();
  }
}
