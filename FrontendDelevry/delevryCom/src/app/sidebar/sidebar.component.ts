import { ChangeDetectorRef, Component, OnDestroy ,OnInit,Input} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../shared/menuItems'; // ou '../share/menu-items' selon ton arborescence
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  resizeListener!: () => void;

  @Input() isOpen = false;
  isMobile = false;
  menuItems: any[] = [];
  userRole: string | null;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private auth: AuthService,
    private menuItemService: MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.userRole = this.auth.getUserData()?.role ?? localStorage.getItem('role');

    this.menuItems = this.menuItemService.getMenuItems().filter(item =>
      this.userRole ? item.role.includes(this.userRole) : false
    );
  }

  ngOnInit(): void {
    this.checkScreenSize();
    this.resizeListener = () => this.checkScreenSize();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    window.removeEventListener('resize', this.resizeListener);
  }

  onToggleSidebar(): void {
    this.isOpen = !this.isOpen;

    // Désactiver le scroll en mobile uniquement
    if (this.mobileQuery.matches) {
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }
  }

  closeSidebar(): void {
    this.isOpen = false;
    document.body.style.overflow = '';
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;

    // Fermer la sidebar automatiquement si on est sur mobile
    if (this.isMobile) {
      this.isOpen = false;
      document.body.style.overflow = '';
    }
  }
}