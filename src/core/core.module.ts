import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { ProductionsModule } from './production/productions.module';
import { ProductsModule } from './product/products.module';
import { SubscribersModule } from './subscriber/subscribers.module';
import { GroupsModule } from './group/groups.module';
import { PackagingModule } from './packaging/packaging.module';
import { DiscountModule } from './discount/discount.module';
import { PromotionalEventsModule } from './promotional-event/promotional-events.module';
import { SellingUnitsModule } from './selling-unit/selling-units.module';
import { SearchHistoriesModule } from './search-history/search-histories.module';
import { ProductInterestsModule } from './product-interest/product-interests.module';
import { ProductFiltersModule } from './product-filter/product-filters.module';
import { FiltersModule } from './filter/filters.module';
import { UnitsModule } from './unit/units.module';
import { UnitCategoriesModule } from './unit-category/unit-categories.module';
import { AuthModule } from './auth/auth.module';
import { CompanyTypeModule } from './company-type/company-type.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CompanyModule,
    ProductionsModule,
    ProductsModule,
    SubscribersModule,
    GroupsModule,
    CompanyTypeModule,
    PackagingModule,
    DiscountModule,
    PromotionalEventsModule,
    SellingUnitsModule,
    SearchHistoriesModule,
    ProductInterestsModule,
    ProductFiltersModule,
    FiltersModule,
    UnitsModule,
    UnitCategoriesModule
  ],
  providers: [],
  exports: [UsersModule, AuthModule],
})
export class CoreModule { }
