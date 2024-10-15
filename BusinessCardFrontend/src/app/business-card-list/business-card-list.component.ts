import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-business-card-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './business-card-list.component.html',
  styleUrl: './business-card-list.component.css'
})
export class BusinessCardListComponent implements OnInit{

  businessCards: any[] = [];
  filteredCards: any[] = [];
  filterForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: [''],
      dob: [''],
      email: [''],
      phone: [''],
      gender: ['']
    });
  }

  ngOnInit(): void {
    this.getBusinessCards();
  }

  // Fetch all business cards from the API
  getBusinessCards(): void {
    this.http.get<any[]>('https://localhost:5001/api/businesscard').subscribe(
      (response) => {
        this.businessCards = response;
        this.filteredCards = [...this.businessCards]; // Initial display
      },
      (error) => {
        console.error('Error fetching business cards:', error);
      }
    );
  }

  // Apply filters to the list
  applyFilters(): void {
    const { name, dob, email, phone, gender } = this.filterForm.value;

    this.filteredCards = this.businessCards.filter(card => {
      return (
        (!name || card.name.includes(name)) &&
        (!dob || card.dob === dob) &&
        (!email || card.email.includes(email)) &&
        (!phone || card.phone.includes(phone)) &&
        (!gender || card.gender.toLowerCase() === gender.toLowerCase())
      );
    });
  }

  // Delete a specific business card
  deleteCard(id: string): void {
    if (confirm('Are you sure you want to delete this card?')) {
      this.http.delete(`https://localhost:5001/api/businesscard/${id}`).subscribe(
        () => {
          this.businessCards = this.businessCards.filter(card => card.id !== id);
          this.applyFilters(); // Update the filtered list after deletion
        },
        (error) => {
          console.error('Error deleting business card:', error);
        }
      );
    }
  }

  // Export business card (choose between CSV or XML format)
  exportCard(id: string, format: string): void {
    this.http.get(`https://localhost:5001/api/businesscard/export/${id}?format=${format}`, { responseType: 'blob' })
      .subscribe((file) => {
        const blob = new Blob([file], { type: format === 'csv' ? 'text/csv' : 'application/xml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `business_card.${format}`;
        a.click();
      },
      (error) => {
        console.error('Error exporting business card:', error);
      });
  }
}
