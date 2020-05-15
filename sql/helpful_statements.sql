-- get all subcategories with their parent cat names
SELECT sc.id, sc.name AS subcategory, c.name AS parentcategory
FROM "SubCatgories"  AS sc
INNER JOIN "Categories" AS c
ON (sc."parentCat" = c.id);


-- drop all tables
DROP TABLE "Categories" CASCADE;
DROP TABLE "Items" CASCADE;
DROP TABLE "Packagings" CASCADE;
DROP TABLE "Purchases" CASCADE;
DROP TABLE "SubCategories" CASCADE;
DROP TABLE "PurchaseItem" CASCADE;
DROP TABLE "Origins" CASCADE;

DROP TABLE "Users" CASCADE;

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


    