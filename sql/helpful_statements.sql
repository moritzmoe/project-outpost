-- get all subcategories with their parent cat names
SELECT sc.id, sc.name AS subcategory, c.name AS parentcategory
FROM "SubCatgories"  AS sc
INNER JOIN "Categories" AS c
ON (sc."parentCat" = c.id);