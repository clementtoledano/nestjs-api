import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { ProductionsModule } from './productions/productions.module';
import { ProductsModule } from './products/products.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { GroupsModule } from './groups/groups.module';
import { CompanyTypesModule } from './company-types/company-types.module';
import { PackagingModule } from './packaging/packaging.module';
import { DiscountModule } from './discount/discount.module';
import { DiscountThemesModule } from './discount-themes/discount-themes.module';
import { PromotionalEventsModule } from './promotional-events/promotional-events.module';
import { SellingUnitsModule } from './selling-units/selling-units.module';
import { SearchHistoriesModule } from './search-histories/search-histories.module';
import { ProductInterestsModule } from './product-interests/product-interests.module';
import { FamiliesModule } from './families/families.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductFiltersModule } from './product-filters/product-filters.module';
import { FiltersModule } from './filters/filters.module';
import { UnitsModule } from './units/units.module';
import { UnitCategoriesModule } from './unit-categories/unit-categories.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CompaniesModule,
    ProductionsModule,
    ProductsModule,
    SubscribersModule,
    GroupsModule,
    CompanyTypesModule,
    PackagingModule,
    DiscountModule,
    DiscountThemesModule,
    PromotionalEventsModule,
    SellingUnitsModule,
    SearchHistoriesModule,
    ProductInterestsModule,
    FamiliesModule,
    CategoriesModule,
    ProductFiltersModule,
    FiltersModule,
    UnitsModule,
    UnitCategoriesModule
  ],
  providers: [],
  exports: [UsersModule, AuthModule],
})
export class CoreModule { }
