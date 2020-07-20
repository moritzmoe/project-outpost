-- get all subcategories with their parent cat names
SELECT sc.id, sc.name AS subcategory, c.name AS parentcategory
FROM "SubCategories"  AS sc
INNER JOIN "Categories" AS c
ON (sc."parentCat" = c.id);

--overview of all items 
SELECT "Item"."barcode", "Item"."name", "Item"."weight", "Item"."score",
    "SubCategory"."name" AS "SubCategory", "SubCategory"."co2" AS "SubCategory.co2", 
    "Packaging"."name" AS "Packaging", "Packaging"."co2" AS "Packaging.co2", 
    "Origin"."name" AS "Origin", "Origin"."co2" AS "Origin.co2" 
FROM "Items" AS "Item" 
    LEFT OUTER JOIN "Packagings" AS "Packaging" ON "Item"."packaging" = "Packaging"."id" 
    LEFT OUTER JOIN "SubCategories" AS "SubCategory" ON "Item"."categoryId" = "SubCategory"."id" 
    LEFT OUTER JOIN "Origins" AS "Origin" ON "Item"."origin" = "Origin"."id" 
ORDER BY "Item"."updatedAt" DESC;

--overview of all purchases
SELECT 
"Purchase"."id" AS "purchase.id", 
"Purchase->User"."email" AS "user.email",
"Items"."name" AS "item.name", 
"Items"."barcode" AS "item.barcode",
"Items"."score" AS "item.score",
"Items->Packaging"."name" AS "item.packaging", 
"Items->SubCategory"."name" AS "item.subcategory",
"Items->Origin"."name" AS "item.origin",
"Purchase"."createdAt" AS "Purchase.CreatedAt"
FROM "Purchases" AS "Purchase" 
LEFT OUTER JOIN ( "PurchaseItems" AS "Items->PurchaseItem" 
INNER JOIN "Items" AS "Items" 
ON "Items"."id" = "Items->PurchaseItem"."ItemId") 
ON "Purchase"."id" = "Items->PurchaseItem"."PurchaseId" 
LEFT OUTER JOIN "Packagings" AS "Items->Packaging" 
ON "Items"."packaging" = "Items->Packaging"."id" 
LEFT OUTER JOIN "SubCategories" AS "Items->SubCategory" 
ON "Items"."categoryId" = "Items->SubCategory"."id" 
LEFT OUTER JOIN "Origins" AS "Items->Origin" 
ON "Items"."origin" = "Items->Origin"."id"
LEFT OUTER JOIN "Users" AS "Purchase->User" 
ON "Purchase"."userId" = "Purchase->User"."id"
ORDER BY "Purchase"."updatedAt" DESC;
    