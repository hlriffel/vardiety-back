const calendarConstants = {
  SQL_GET_SIMILAR_COMPONENTS: 'SELECT * FROM GET_SIMILAR_COMPONENTS($id_component, $qt_results) ',
  SQL_GET_NEXT_DAYS: `
    WITH RECURSIVE CALENDAR AS (
      SELECT	NOW() AS DT_CALENDAR, 0 AS LEVEL
      UNION ALL
      SELECT	NOW() + INTERVAL '1 DAY' * (C.LEVEL + 1) AS DT_CALENDAR, C.LEVEL + 1
      FROM	CALENDAR C
      WHERE	NOW() + INTERVAL '1 DAY' * (C.LEVEL + 1) <= CURRENT_DATE + INTERVAL '1 @@PERIOD'
    )
    SELECT	TO_CHAR(DT_CALENDAR, 'YYYY-MM-DD') AS DT_CALENDAR
    FROM	CALENDAR
    WHERE	EXTRACT (ISODOW FROM DT_CALENDAR) = ANY (STRING_TO_ARRAY(:week_days, ',')::NUMERIC[])
  `
};

export default calendarConstants;
