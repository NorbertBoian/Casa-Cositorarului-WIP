import {alcoholAndQuantityWithAuto} from './alcoholAndQuantityWithAuto'
import {alcoholAndQuantity} from './alcoholAndQuantity'
import allergen from './allergen'
import {ingredientDetails, ingredientEntryDetails} from './ingredientDetails'
import ingredient from './ingredient'
import {localizedString} from './localizedString'
import menuCategory from './menuCategory'
import menuItems from './menuItems'
import crawled, {parkingSchedule, parkingZone, timeInterval} from './crawled'

export const schemaTypes = [
  menuCategory,
  menuItems,
  allergen,
  alcoholAndQuantity,
  alcoholAndQuantityWithAuto,
  ingredientDetails,
  ingredient,
  ingredientEntryDetails,
  localizedString,
  parkingZone,
  parkingSchedule,
  timeInterval,
  crawled,
]
