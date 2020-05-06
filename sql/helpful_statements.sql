-- get all subcategories with their parent cat names
SELECT sc.id, sc.name AS subcategory, c.name AS parentcategory
FROM "SubCatgories"  AS sc
INNER JOIN "Categories" AS c
ON (sc."parentCat" = c.id);


-- drop all tables
DROP TABLE "Categories" CASCADE;
DROP TABLE "Items" CASCADE;
DROP TABLE "PackMats" CASCADE;
DROP TABLE "PackTypes" CASCADE;
DROP TABLE "Purchases" CASCADE;
DROP TABLE "SubCategories" CASCADE;
DROP TABLE "Users" CASCADE;
DROP TABLE "purchaseItem" CASCADE;


