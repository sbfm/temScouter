var teamList;
//使ってない？
//const typeNameList = ["中立","風","地面","水","炎","みどり","電気","精神","デジタル","格闘","クリスタル","どく"];
const categoryLitst = ["Physical","Special","Status"];
//const categoryLitst = ["物理","特殊","変化"];
const priorityLitst = ["-",">",">>",">>>",">>>+",">>>*"];

// タイプ別のsvg画像
const typeIcon = [
"PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDUwIDUwIj4NCjxnIGlkPSJsIj4NCjxwb2x5Z29uIHBvaW50cz0iMTYuMDYzLDEwLjM3NSA3Ljc1LDE1LjU2MyA1LjkzOCwzMS4xMjUgMTYuODc1LDQ0LjY4OCAzMC44NzUsNDUuNTYzIDQ0LDM1LjEyNSA0NC45MzgsMjAuMzc1IDMxLjkzOCw1LjEyNSAxOS43NSw1LjEyNSAiLz4NCjwvZz4NCjxnIGlkPSJkIj4NCjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTcsMTMuMzc1IDExLjEyNSwxNy44MTMgOS4yNSwyOS41NjMgMTguODEzLDQxLjA2MyAzMC41NjMsNDEuNjI1IDQwLjQzOCwzMy40MzggNDAuOTM4LDIxLjU2MyAzMC44MTMsOS4zMTMgMjIuNTYzLDguOTM4IDIwLjc1LDEwLjE4OCAyNy4zNzUsMTMuNjI1IDMxLjU2MywyMy42MjUgMjUsMzEuODEzIDE3LjkzOCwyNS44MTMgMjAuNzUsMjIuMTI1IDIyLjMxMywyMy42MjUgMjEuMDYzLDI1LjM0NCAyNC41NjMsMjguMDYzIDI4LjEyNSwyNSAyOC4xMjUsMjAuNDM4IDI1LDE1LjEyNSAiLz4NCjwvZz4NCjwvc3ZnPg0K", 
"PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDUwIDUwIj4NCjxnIGlkPSJsIj4NCjxwb2x5Z29uIHBvaW50cz0iMzYuNjg4LDQuMzc1IDQ1LjU2Myw0IDQzLjE4OCwyMS4xMjUgMzguNTYzLDI2LjQ2OSAzOS44NzUsMjguODc1IDI5LjMxMyw0MyAxMS42ODgsNDYuNDM4IDguNDM4LDQ0LjA2MyAxNC4xMjUsMzcuMTI1IDUuMzc1LDIxLjY4OCA3Ljc1LDEyLjgxMyAyMS44NzUsNi41IDI4LjEyNSwxMC45MzggIi8+DQo8L2c+DQo8ZyBpZD0iZCI+DQo8cG9seWdvbiBmaWxsPSIjNkJDMDk5IiBwb2ludHM9IjIxLjU2Myw5Ljg3NSAxMC43NSwxNC42ODggOC42ODgsMjAuMzEzIDE1LjY4OCwzMy4xODggMjYuNjg4LDMxLjI1IDM5LjE4OCwyMiA0MS41LDcuNjI1IDM4LjUsNy42MjUgMzAuOTM4LDEzLjA2MyAyNS4wOTQsMTMuNSAyMC41LDE4LjI1IDIxLjc1LDIwLjgxMyAyNC4zNzUsMjAuOTM4IDI3LjE4OCwxOC41NjMgMjguNzUsMjAuMDYzIDI1LjA5NCwyMy41NjMgMjAuNjg4LDIzLjMxMyAxNy4wNjMsMTcuNzUgMjMuNjg4LDEyICIvPg0KPHBvbHlnb24gZmlsbD0iIzZCQzA5OSIgcG9pbnRzPSIzNS40MzgsMjkuNTYzIDI2LjkzOCw0MC41IDEzLDQzLjYyNSAxNy42ODgsMzUuNjI1IDI3LjA2MywzNC4wNjMgIi8+DQo8L2c+DQo8L3N2Zz4NCg==", 
"PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDUwIDUwIj4NCjxnIGlkPSJsIj4NCjxwb2x5Z29uIHBvaW50cz0iMTcuNjI1LDEzLjUgMTEsMTcuMTg4IDMuMDYzLDM3LjE4OCAxMS44MTMsNDUuMTI1IDIzLjkzOCw0OC4xODggMjkuMTI1LDQ0LjkzOCAzOS44NzUsNDQuNzUgNDQuNTYzLDQwLjM3NSA0MS41NjMsMTcuNTYzIDI5LjY4OCwyLjY4OCAxOC4yNSw4Ljc1ICIvPg0KPC9nPg0KPGcgaWQ9ImQiPg0KPHBvbHlnb24gZmlsbD0iI0I3NzU1RiIgcG9pbnRzPSIyOS42MjUsMjEuNjI1IDIxLDE1LjI1IDIxLDExLjU2MyAyOC4xMjUsNi44NzUgMzksMjAuODc1IDQxLjQzOCwzOC43NSAzOC4zNzUsNDEuNjI1IDI4Ljg3NSw0MS42MjUgMjMuMTg4LDQ0LjI1IDEzLjc1LDQyLjY4OCA2LjkzOCwzNi4yNSAxMy4xODgsMjAuNjI1IDE4LjMxMywxNyAyNy4zMTMsMjIuODEzIDI3LjQzOCwzMi40MzggMjIuOTM4LDM0LjU2MyAyMS4wNjMsMzMuMTg4IDIwLjgxMywzMC4zMTMgMjMuMTI1LDI4LjYyNSAyMy4xMjUsMjcgMjAuMTg4LDI2LjkzOCAxOC40MzgsMjguNTYzIDE4LjQzOCwzNC44NzUgMjAuODEzLDM2Ljc1IDI1LDM2Ljc1IDMwLDM0LjE4OCAiLz4NCjwvZz4NCjwvc3ZnPg0K", 
"PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDUwIDUwIj4NCjxnIGlkPSJsIj4NCjxwYXRoIGZpbGw9IiMxQTIwMTkiIGQ9Ik0yMC41LDBDMjAuMzEzLDAuNDM4LDE0LDE1LjUsMTQsMTUuNUwyLjE4OCwyOS4xODhMOS4yNSw0NmwxMC42MjUsMy42ODhsMy43NS0xTDI5Ljg3NSw1MGw4LjkzOC01LjYyNSBsNS4wNjMtOS4yNWwtMy0xNC4yNUwyOC4yNSwzLjM3NUwyMC41LDB6Ii8+DQo8L2c+DQo8ZyBpZD0iZCI+DQo8cG9seWdvbiBmaWxsPSIjNEJDMEVGIiBwb2ludHM9IjE5LjE4OCw0Ni4xMjUgMTMuMzc1LDQ0Ljg3NSA2LjgxMywzNC44NzUgNi44MTMsMjguNjI1IDE2LjEyNSwxNy43NSAyMy4wMzEsNC41NjMgMzUuNzUsMTcuNjI1IDQwLjgxMywzMy42MjUgMzAuNzUsNDcuMTI1IDI2LjI1LDQ3LjEyNSAyMC44NzUsNDIuNzUgMTcuNTYzLDM1LjY4OCAyNC40MzgsMjkuODc1IDI4LjA2MywzMi44NzUgMjYuMTI1LDM0LjU2MyAyNSwzMy44MTMgMjMuNDM4LDM1LjU2MyAyNiwzNy40MzggMzEuMzc1LDMyLjY4OCAyNC42ODgsMjUuODQ0IDE0LjMxMywzNS4yNSAiLz4NCjwvZz4NCjwvc3ZnPg0K", 
"PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDUwIDUwIj4NCjxnIGlkPSJsIj4NCjxwb2x5Z29uIHBvaW50cz0iMjkuNDM4LDIuMzc1IDI1LDguNDM4IDIyLjU2Myw2LjkzOCAxOC4wNjMsMTYuNzUgNy45MzgsMjUuNSA4LjU2MywzNC4yNSAxNC44MTMsNDIuODc1IDI0LjU2Myw0OS4wNjMgNDEsMzYuODEzIDQxLjc1LDI4LjkzOCAzMy41NjMsMTkuMTI1IDM2LjI1LDE0LjkzOCAzNS43NSwxMC4wNjMgIi8+DQo8L2c+DQo8ZyBpZD0iZCI+DQo8cG9seWdvbiBmaWxsPSIjREM1QjREIiBwb2ludHM9IjIzLjQzOCwxMS4xMjUgMjAuMDYzLDE4LjM3NSAxMC44NzUsMjcuMDYzIDEwLjg3NSwzMi42ODggMjMuODc1LDQ1LjU2MyAzOC45MzgsMzQuNjg4IDM4LjU2MywyOC44NzUgMzIuMzEzLDIxLjU2MyAyNy44MTMsMjEuNjI1IDIyLjY4OCwyOC4zNDQgMjQuODQ0LDMyLjMxMyAyOC41LDMyIDI4LjYyNSwyOC4zNDQgMzEuNTYzLDMxLjg3NSAyNS4zMTMsMzUuNjI1IDIwLjYyNSwzMC4yNSAyMC45MzgsMjYuODEzIDI2LjEyNSwxOS44MTMgMjYuMjUsMTQuNzUgIi8+DQo8cGF0aCBmaWxsPSIjREM1QjREIiBkPSJNMzAuNzUsMTcuNWMtMC42MjUtMC4zNzUtMy4zMTMtNC4wNjMtMy4zMTMtNC4wNjNMMjcuMDYzLDEwbDIuNjI1LTQuMTg4bDQuMDYzLDQuODEzdjMuNjI1TDMwLjc1LDE3LjV6Ii8+DQo8L2c+DQo8L3N2Zz4NCg==", 
"PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDUwIDUwIj4NCjxnIGlkPSJsIj4NCjxwYXRoIGQ9Ik0zNi41LDEuMTI1Yy0wLjE4OCwwLjA2My0xMC4wNjMsMTEuNDM4LTEwLjA2MywxMS40MzhMMTAuOTM4LDE3bC01LjgxMyw5LjE4OGwwLjgxMywxMC43NWwyLjQzOCw2LjE4OGw1Ljg3NSwyLjI1IGw0LjA2MywzLjQzOGgxMi44MTNsMTEtMTEuNTYzbDIuMjUtMTAuNjI1bC0wLjc1LTExLjMxM2wtMS44MTMtNy45MzhMMzYuNSwxLjEyNXoiLz4NCjwvZz4NCjxnIGlkPSJkIj4NCjxwb2x5Z29uIGZpbGw9IiNBN0QxN0EiIHBvaW50cz0iMjUuMzc1LDE2LjUgMTIuODc1LDIwLjY4OCA4LjMxMywyNi45MzggOC44NzUsMzUgMTMuNSw0Mi4yNSAxMy43NSwzNS4zNzUgMTguNTYzLDI4IDI4LjI1LDI3Ljc1IDMxLjQzOCwzMy4yNSAyNy43NSwzNy4xODggMjUsMzcuMDYzIDIzLjUsMzUuODEzIDI3LjI1LDMzLjYyNSAyNywzMC4yNSAxOS44NzUsMzAuODc1IDE2LjU2MywzNi41NjMgMTYuNjI1LDQxLjQzOCAxOS40MzgsNDUuMzEzIDI5LjgxMyw0NS4zMTMgMzguNDM4LDM2IDQwLjg3NSwyOC41NjMgNDAuODc1LDE3LjY4OCAzOS43NSwxMS4xODggMzYuMjUsNS45MzggMzEuNDM4LDEzICIvPg0KPC9nPg0KPC9zdmc+DQo=", 
"PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDUwIDUwIj4NCjxnIGlkPSJsIj4NCjxwb2x5Z29uIHBvaW50cz0iMjUuNjI1LDMuNTYzIDIuNDM4LDE4LjEyNSAxNC4wMzEsMjcuNjg4IDguOTM4LDMzLjQzOCAzNS4yNSw0Ny41IDQ0LjA2Myw0Ny41IDM5LjY4OCwzMC45MzggNDYuNjI1LDIzLjU2MyA0NSwxOC44NzUgMjkuOTM4LDMuNTYzICIvPg0KPC9nPg0KPGcgaWQ9ImQiPg0KPHBhdGggZmlsbD0iI0Y3REE3NyIgZD0iTTI3Ljg3NSw2Ljg3NWMtMC43NSwwLjI1LTIwLjkzOCwxMi4wNjMtMjAuOTM4LDEyLjA2M2wxNS42MjUsOS40NjlsNy01LjU5NGwtMi45MzgtMy4xODhsLTMuNSwzLjEyNSBsLTIuNDM4LTIuMTI1bDYuMzc1LTQuODEzbDYuMjUsNy4wNjNsLTkuNjg4LDguMzc1bC00LjU2My0yLjQzOEwxNC4zNzUsMzIuNWwyMS40MzgsMTEuNDM4aDQuMzc1YzAsMC0zLjMxMy0xMS0zLjUtMTEgUzMwLjg3NSwzNC41LDMwLjg3NSwzNC41bDExLjMxMy0xMS42MjV2LTIuMDYzTDI3Ljg3NSw2Ljg3NXoiLz4NCjwvZz4NCjwvc3ZnPg0K", 
"PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDUwIDUwIj4NCjxnIGlkPSJsIj4NCjxwYXRoIGQ9Ik0yOC4yNSwxLjc1QzI4LDIuMTI1LDIyLjg3NSw1Ljg3NSwyMi44NzUsNS44NzVsLTIuMTg4LDZjMCwwLTguMDYzLDguMTI1LTguMTI1LDguMzEzczAsMTAuMTI1LDAsMTAuMTI1bDguMTg4LDguODc1IEwyNSw0OS4zMTNsNS4zNzUtMy43NWwyLjM3NS03LjE4OEw0MC4xMjUsMzF2LTkuNUwzNS41LDE0TDMzLDEzLjU2M2wtMi4wNjMtNWwtMC44NzUtNS4yNUwyOC4yNSwxLjc1eiIvPg0KPC9nPg0KPGcgaWQ9ImQiPg0KPHBvbHlnb24gZmlsbD0iI0I4NjQ5QSIgcG9pbnRzPSIyNy42MjUsNS4xODggMjQuNjI1LDcuODEzIDIzLDEyLjkzOCAxNS4zMTMsMjEuMDYzIDE1LjMxMywyOS4yNSAyMi41NjMsMzcuNSAyNS40MzgsNDQuNjg4IDI2LjM3NSw0NS41NjMgMjguNjI1LDQzLjEyNSAyOS4xODgsMzkgMzcuNDM4LDMwLjA2MyAzNy40MzgsMjIuMzc1IDMzLjc1LDE2LjkzOCAyOS45MzgsMjAuNDM4IDI1LjUsMjAuNzUgMjIuNSwyNi40MzggMjUuODEzLDMwLjE4OCAyOS42MjUsMjggMjguMzc1LDI2LjEyNSAyOC41LDI0LjQzOCAzMC4yNSwyNC42ODggMzIuMTI1LDI3LjM3NSAyOS45MzgsMzEuMDYzIDI1LDMyLjgxMyAyMC4zMTMsMjggMjMuNTYzLDE5IDI5LjA2MywxOC4yNSAzMS43NSwxNS4yNSAyOS4wNjMsMTEuNjg4ICIvPg0KPC9nPg0KPC9zdmc+DQo=", 
"PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDUwIDUwIj4NCjxnIGlkPSJsIj4NCjxwb2x5Z29uIHBvaW50cz0iMTUuMzc1LDEyLjM3NSAxNS4zNzUsMjEuNjg4IDkuODc1LDIxLjY4OCA3LjY4OCwyNC4xMjUgOC41LDQyLjMxMyAxMS41MzEsNDUuMzc1IDM4LjgxMyw0NC42ODggNDIuNTYzLDQwLjYyNSA0Mi41NjMsMjIuNjI1IDQxLjEyNSwyMC45MzggNDIuNTYzLDE5LjA2MyA0Mi41NjMsOC4zNzUgNDAuNSw2IDI4LjY4OCw2IDI2LjgxMyw3Ljc1IDI2LjkzOCw5LjUgMTcuMzc1LDkuNSAiLz4NCjwvZz4NCjxnIGlkPSJkIj4NCjxwb2x5Z29uIGZpbGw9IiNBM0JDQkYiIHBvaW50cz0iMTguMzc1LDE0LjYyNSAxOC4zNzUsMjEuNSAxOS44NzUsMjIuODEzIDIzLjc1LDIyLjgxMyAyNSwyNC42ODggMjUsMzMuNjI1IDIxLjI1LDM0LjU2MyAxNy40MzgsMzMuMzc1IDE3LjQzOCwzMS4wNjMgMTguNSwyOS42ODggMTkuNSwzMC42MjUgMTkuNSwzMS4yNSAyMi41LDMxLjM3NSAyMi42MjUsMjUgMTMuMTI1LDI1IDExLjA2MywyNi40MzggMTEuMDYzLDM5LjE4OCAxMy41LDQxLjY4OCAzNi42MjUsNDEuNjg4IDM5LjU2MywzOC42ODggMzkuNTYzLDIzLjUgMzcuOTM4LDIxLjg3NSAyOS4zMTMsMjEuODEzIDI3LjU2MywyMC4xODggMjcuNSwxMy4xODggMTkuODc1LDEzLjE4OCAiLz4NCjxwb2x5Z29uIGZpbGw9IiNBM0JDQkYiIHBvaW50cz0iMjkuMzc1LDEwLjI1IDI5LjM3NSwxOC41NjMgMzAuNjI1LDE5LjY4OCAzNy44NzUsMTkuNjg4IDM5LjU2MywxOC41IDM5LjU2MywxMSAzNy44NzUsOC43NSAzMC45MzgsOC43NSAiLz4NCjwvZz4NCjwvc3ZnPg0K", 
"PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDUwIDUwIj4NCjxnIGlkPSJsIj4NCjxwb2x5Z29uIHBvaW50cz0iMTQuNjI1LDUuNDM4IDguNDM4LDEwLjM3NSA4LjQzOCwxNi4xMjUgMTAuMTg4LDE4LjU2MyA3LjY4OCwyMC43NSA4LjkzOCwyOC4zNzUgNi4wNjMsMzEuOTM4IDYuMDYzLDM4LjY4OCAxMS45MzgsNDUuMTI1IDI4LjEyNSw0NS4xMjUgMzIuNSw0MS4zMTMgMzIuNSwzNy45MzggMzYuNSwzNy44MTMgMzkuNjI1LDM2LjU2MyA0Ni41NjMsMjAuMzc1IDQxLjc1LDEzLjA2MyAzNS4wNjMsMTIuOTM4IDI3Ljg3NSw3LjQzOCAyMy42ODgsOS4zMTMgMTguMjUsNS40MzggIi8+DQo8L2c+DQo8ZyBpZD0iZCI+DQo8cG9seWdvbiBmaWxsPSIjRUM5MDVEIiBwb2ludHM9IjE3LDguODc1IDEwLjkzOCwxMy41IDEzLjYyNSwxOS4xODggMTEuMjUsMjIgMTAuOTM4LDI5LjA2MyAxNS41NjMsMzIuMDYzIDE5LjM3NSwyOS42ODggMjAuNjI1LDEyLjE4OCAiLz4NCjxwYXRoIGZpbGw9IiNFQzkwNUQiIGQ9Ik0yMS40MzgsMzAuMTg4Yy0wLjE4OC0xLjY4OCwyLjEyNS0xNS43NSwyLjEyNS0xNS43NWw0LjUtMy4wNjNsNC4zMTMsMy41NjNMMjkuMTI1LDMxLjVsLTMuNzUsMS42ODggTDIxLjQzOCwzMC4xODh6Ii8+DQo8cG9seWdvbiBmaWxsPSIjRUM5MDVEIiBwb2ludHM9IjM0LjE4OCwxNy4zMTMgMzAuODc1LDMxLjUgMzIuODc1LDM0LjUgMzYuMjUsMzQuNSA0Mi4xMjUsMjMuMzEzIDQyLjEyNSwxOS4xMjUgNDAsMTYuMDYzIDM2LjE4OCwxNi4wNjMgIi8+DQo8cG9seWdvbiBmaWxsPSIjRUM5MDVEIiBwb2ludHM9IjEwLjI1LDMxLjc1IDguNSwzNC41IDguNSwzNi44MTMgMTMuMTI1LDQyLjM3NSAyNi4yNSw0Mi44MTMgMjkuNTYzLDQwLjMxMyAyOS41NjMsMzcuODEzIDI4LjA2MywzNS40MzggMjQuMTI1LDM1LjQzOCAxOS45MzgsMzMuMTg4IDE2LjUsMzUuMTI1ICIvPg0KPC9nPg0KPC9zdmc+DQo=", 
"PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDUwIDUwIj4NCjxnIGlkPSJsIj4NCjxwb2x5Z29uIHBvaW50cz0iMjYuMDYzLDAuNTk0IDkuNSwxNC40MDYgOS41LDE3LjY1NiA3LjY4OCwxOS41OTQgMTEuMzc1LDQxLjAzMSAyMy45MzgsNDkuNDA2IDM2LjUsNDIuNTMxIDQyLjMxMywxOS4wOTQgIi8+DQo8L2c+DQo8ZyBpZD0iZCI+DQo8cG9seWdvbiBmaWxsPSIjREI0OTY2IiBwb2ludHM9IjIzLjA2MywxOS44NzUgMjUsMTguMzc1IDIzLjA2MywxNi44NzUgMjYuMTI1LDE0LjU2MyAzMS40MzgsMTkuODc1IDIzLjkzOCwyNi41IDEyLjMxMywxNi42MjUgMjUuODEzLDQuMzc1IDM4LjgxMywxOS4zMTMgMzQuMzc1LDQwLjY4OCAyNSw0Ni4zNzUgMjUsMjguODc1IDMzLjc1LDIxLjE4OCAzMy41NjMsMTguNSAyNi41LDExLjM3NSAyMC4xMjUsMTUuOTM4IDIwLjE4OCwxNy4zMTMgIi8+DQo8cG9seWxpbmUgZmlsbD0iI0RCNDk2NiIgcG9pbnRzPSIxMS41NjMsMjAuNDM4IDE0LDM5LjUgMjIuODEzLDQ1Ljg3NSAyMi44MTMsMjguNzUgMTEuODEzLDIwLjQzOCAiLz4NCjwvZz4NCjwvc3ZnPg==", 
"PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDUwIDUwIj4NCjxnIGlkPSJsIj4NCjxwb2x5Z29uIHBvaW50cz0iMjcuODc1LDIuNjI1IDIyLjU2Myw2LjkzOCAyMS43NSw5IDEyLjQzOCw5IDYuMjUsMTcuMTI1IDYuMjUsMjAuODc1IDkuNjI1LDI3LjkzOCAxMi42ODgsMjkuNSAxNS4zNzUsMjkuNSAxNi4wNjMsMzkuNTYzIDIzLjkzOCw0Ny41IDMxLjc1LDQ3LjUgMzkuODc1LDQwLjU2MyA0MC40MzgsMzEuMDYzIDM2LjA2MywyNC4xODggMzEuNjg4LDIyLjE4OCAyNy40MzgsMjEuOTM4IDI3LjI1LDE5LjU2MyAzMy41LDE5LjU2MyAzOC4xODgsMTUuMjUgMzguMTI1LDguMzEzIDM0LjYyNSwzLjgxMyAzMS42MjUsMi42MjUgIi8+DQo8L2c+DQo8ZyBpZD0iZCI+DQo8cG9seWdvbiBmaWxsPSIjNUI1NTVBIiBwb2ludHM9IjI5LjUsNS4zMTMgMjQuMzc1LDkuMjUgMjQuMzc1LDEzLjQzOCAyNi45MzgsMTYuODEzIDMxLjkzOCwxNi44MTMgMzUuMzEzLDEzLjg3NSAzNS4zMTMsOS4xODggIi8+DQo8cG9seWdvbiBmaWxsPSIjNUI1NTVBIiBwb2ludHM9IjE4LjgxMywxMS43NSAxNC4zMTMsMTEuNzUgOS42MjUsMTcuMzc1IDkuNjI1LDIxLjE4OCAxMy44MTMsMjUuOTM4IDIwLjM3NSwyNS45MzggMjQuMzc1LDIxLjgxMyAyNC4xMjUsMTYuODEzICIvPg0KPHBvbHlnb24gZmlsbD0iIzVCNTU1QSIgcG9pbnRzPSIxOCwzMi4xODggMjUuMjUsMjUgMzEuNTYzLDI1IDM3LjU2MywzMS42MjUgMzcuMTI1LDM5LjM3NSAzMS42MjUsNDUuMjUgMjYuMDYzLDQ0LjgxMyAyNC4zNzUsNDMuMzEzIDI3LjQzOCw0Mi45MzggMzEsMzkuNjg4IDMwLjc1LDM0LjI1IDI3LjQzOCwzMS45MzggMjQuMzc1LDMxLjgxMyAyMi4zMTMsMzQuNSAyMi41LDM2LjMxMyAyMy43NSwzNy4zMTMgMjUsMzYuNSAyNSwzNC44NzUgMjUuNjI1LDM0IDI3LjMxMywzMy44NzUgMjksMzUuNzUgMjguOTM4LDM5LjM3NSAyNiw0MS40MzggMjIuMTI1LDQxLjM3NSAxOCwzNy41ICIvPg0KPC9nPg0KPC9zdmc+DQo="
];

//const typeNameList = ["中立","風","地面","水","炎","みどり","電気","精神","デジタル","格闘","クリスタル","どく"];
const weakness = [
      [2,2,2,2,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,1,2,2,2,2],
      [2,2,1,2,2,2,2,1,2,2,2,2,3],
      [2,2,1,2,1,3,1,3,2,2,2,3,2],
      [2,2,2,3,1,3,1,2,2,3,2,2,1],
      [2,2,2,1,1,1,3,2,2,2,2,3,2],
      [2,2,2,3,3,1,1,2,2,2,2,2,1],
      [2,2,3,1,3,2,1,1,3,3,2,1,2],
      [2,3,2,2,2,2,2,2,2,2,3,1,2],
      [2,2,2,2,2,2,2,2,3,3,3,2,2],// デジタル
      [2,2,2,3,2,2,2,2,1,2,1,3,2],
      [2,2,2,1,2,1,2,3,3,2,2,2,2],
      [2,2,2,1,3,2,3,2,2,1,2,1,1]
];

function makeTypeIcon(type,size){
  return "<img src=\"data:image/svg+xml;base64," + typeIcon[(type - 1)] + "\" width=\"" + size + "px\" height=\"" + size + "px\">";
}

// ---------------------------------
// ステータスカテゴリーの枠をいい感じにするやつ
// ---------------------------------
function makeStatusCategory(){
  let pointX = [];
  let pointY = [];
  pointX[0] = Math.floor( Math.random() * 10 ) + 0;
  pointX[1] = Math.floor( Math.random() * 10 ) + 90;
  pointX[2] = 100;
  pointX[3] = Math.floor( Math.random() * 10 ) + 90;
  pointX[4] = Math.floor( Math.random() * 10 ) + 0;
  pointX[5] = 0;
  pointY[0] = Math.floor( Math.random() * 5 ) + 0;
  pointY[1] = Math.floor( Math.random() * 5 ) + 0;
  pointY[2] = Math.floor( Math.random() * 15 ) + 15;
  pointY[3] = Math.floor( Math.random() * 5 ) + 45;
  pointY[4] = Math.floor( Math.random() * 5 ) + 45;
  pointY[5] = Math.floor( Math.random() * 15 ) + 15;
  let statusSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100px\" height=\"50px\" viewBox=\"0 0 100 50\" preserveAspectRatio=\"none\">";
  statusSVG = statusSVG + "<polygon fill=\"#1BD1D3\" points=\""
  for (let i = 0; i < 6; i++) {
    statusSVG = statusSVG + pointX[i] + "," + pointY[i] + " ";
  }
  statusSVG = statusSVG + "\"/>";
  statusSVG = statusSVG + "</svg>";
  return "data:image/svg+xml;base64," + btoa(statusSVG);
}


// ---------------------------------
// テクニックの背景にWait＋タイプの色をつけるやつ
// ---------------------------------
function makeTechniqueBackground(type,line) {
      //color,line
      const typeList = ["#FFFFFF","#6AC09A","#B4766A","#4EC0EF","#DC594B","#A7D076","#F7DB76","#B8649A","#A1BCBE","#F08E5F","#B6405C","#5A565B"];
      //中立　風　地面　水　　ひ　みどり　雷　精神　デジタル　格闘、クリスタル,どく
      let colorSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"185px\" height=\"100px\" viewBox=\"0 0 185 100\">";
      colorSVG = colorSVG + "<polygon fill=\"" + typeList[type-1] + "\" points=\"0,0 85,0 15,100 0,100 \"/>";
      for (let i = 0; i < line; i++) {
        var edge = 25 * i + 20 ;
        colorSVG = colorSVG + "<polygon fill=\"" + typeList[type-1] + "\" points=\"" + (edge + 70) + ",0 " + (edge + 90) + ",0 " + (edge + 20) + ",100 " + edge + ",100 \"/>";
      }
      colorSVG = colorSVG + "</svg>";
      return "data:image/svg+xml;base64," + btoa(colorSVG);
}

// ---------------------------------
// ステータスのバーを描画するやつ
// ---------------------------------
function makeStatusBar(bv,sv,tv){
  // バーの最大値を決める
  let maxSt = 337.5;
  let bvline = bv * 1.5 / maxSt * 100;
  let svline = (bv * 1.5 + sv) / maxSt * 100;
  let tvline = (bv * 1.5 + sv + tv / 5) / maxSt * 100;
  return "90deg,#32cd32 0%,#32cd32 " + bvline + "%,#009944 " + bvline + "%,#009944 " + svline + "%,#00ced1 " + svline + "%,#00ced1 " + tvline + "%,rgba(0,0,0,0) " + tvline + "%";
}
