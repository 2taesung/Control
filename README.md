# Control Page

## 📖 프로젝트 설명

uc라는 기기에 포함되어 있는 유니트쿨러(온도/temp), 습도(hum), 팬(fan)을 Control(제어)하는 기능을 가진 페이지.

Control에는 크게 Instance(즉시) 제어, Schedule(스케줄) 제어가 존재.

- 유니트쿨러: 온도 즉시제어, 제상시 송풍 즉시제어, 온도 스케줄제어

- 습도: 습도 즉시제어, 습도 스케줄제어

- 팬: 상태 즉시 제어

## 💿 개발 환경 및 스택

Next.js 12(pages router) / TS / react-query

## 🧨 특징

- 최초 http 통신과 주기적으로 들어오는 Websocket 통신 혼합
- uc는 app으로 app은 'hvac(공조기)', 'Light(조명)', 'nutrient(양액)' 등으로 확장 고려
- 이를 위한 useControlWebsocket, useMonitorWebsocket
- 독립적인 서비스를 보여드리기 위해 일부 MSW 포함

## 실행

```bash
yarn & yarn dev
```

## 비고

데이터를 변경하는 기능은 아직 테스트 전이며 관련 msw가 없습니다.

## 폴더구조

```markdown
📦pages
 ┣ 📂apps
 ┃ ┣ 📂uc
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📜index.tsx
 ┣ 📂site
 ┃ ┗ 📜index.tsx
 ┣ 📜_app.tsx
 ┣ 📜_document.tsx
 ┗ 📜index.tsx
📦src
 ┣ 📂api
 ┃ ┣ 📜Instantces.ts
 ┃ ┗ 📜schedules.ts
 ┣ 📂atoms
 ┃ ┣ 📜controlTargetMachineNumAtom.ts
 ┃ ┣ 📜currentSectorAtom.ts
 ┃ ┣ 📜currentUsernameAtom.ts
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜stateAtomWithLocalStorage.ts
 ┃ ┗ 📜themeAtom.ts
 ┣ 📂components
 ┃ ┣ 📂Layout
 ┃ ┃ ┣ 📂styled
 ┃ ┃ ┃ ┗ 📜ControlMonitoring.style.tsx
 ┃ ┃ ┣ 📜HeaderLayout.tsx
 ┃ ┃ ┣ 📜MUIHeader.tsx
 ┃ ┃ ┣ 📜MainLayout.tsx
 ┃ ┃ ┣ 📜MonitorLayout.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜SectorList.tsx
 ┃ ┃ ┣ 📜TabFeature.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂control
 ┃ ┃ ┣ 📜Cell.test.tsx
 ┃ ┃ ┣ 📜Cell.tsx
 ┃ ┃ ┣ 📜CellInput.tsx
 ┃ ┃ ┣ 📜HeadCell.tsx
 ┃ ┃ ┣ 📜HeadRow.tsx
 ┃ ┃ ┣ 📜InstantContent.tsx
 ┃ ┃ ┣ 📜LazyCellComponent.tsx
 ┃ ┃ ┣ 📜Row.test.tsx
 ┃ ┃ ┣ 📜Row.tsx
 ┃ ┃ ┣ 📜Table.test.tsx
 ┃ ┃ ┣ 📜Table.tsx
 ┃ ┃ ┗ 📜inputConfig.ts
 ┃ ┣ 📂uc
 ┃ ┃ ┣ 📜InputField.tsx
 ┃ ┃ ┣ 📜InstantSection.tsx
 ┃ ┃ ┣ 📜MainSection.tsx
 ┃ ┃ ┣ 📜ScheduleSection.tsx
 ┃ ┃ ┗ 📜UC_InstantContainer.tsx
 ┃ ┣ 📜MUICard.tsx
 ┃ ┗ 📜SiteList.tsx
 ┣ 📂constants
 ┃ ┣ 📂display
 ┃ ┃ ┣ 📜SECTOR_DISPLAY.ts
 ┃ ┃ ┣ 📜SITE_DISPLAY.ts
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📜APPS.ts
 ┃ ┣ 📜DEFAULTS.ts
 ┃ ┣ 📜HOME.ts
 ┃ ┣ 📜LOGIN.ts
 ┃ ┗ 📜UC.ts
 ┣ 📂functions
 ┃ ┣ 📜addSchedule.ts
 ┃ ┣ 📜defaultRowSetting.ts
 ┃ ┣ 📜defaultSechedule.ts
 ┃ ┣ 📜filteredSectors.test.ts
 ┃ ┣ 📜filteredSectors.ts
 ┃ ┣ 📜filteredSectorsByAppName.test.ts
 ┃ ┣ 📜filteredSectorsByAppName.ts
 ┃ ┣ 📜getDefaultSector.ts
 ┃ ┗ 📜makeTargetMap.ts
 ┣ 📂hooks
 ┃ ┣ 📜useApplyIndex.ts
 ┃ ┣ 📜useApplyValue.ts
 ┃ ┣ 📜useControlWebsocket.ts
 ┃ ┣ 📜useMonitorWebsocket.ts
 ┃ ┣ 📜useMounted.ts
 ┃ ┣ 📜useMswInit.tsx
 ┃ ┣ 📜useRequiredQuery.ts
 ┃ ┗ 📜useTargetMonitor.ts
 ┣ 📂mocks
 ┃ ┣ 📜browser.ts
 ┃ ┣ 📜handlers.ts
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜mockData.ts
 ┃ ┗ 📜server.ts
 ┣ 📂styles
 ┃ ┣ 📜globalStyle.ts
 ┃ ┣ 📜mixins.ts
 ┃ ┗ 📜theme.ts
 ┣ 📂types
 ┃ ┣ 📜app.ts
 ┃ ┣ 📜control.ts
 ┃ ┣ 📜globalTheme.d.ts
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜schedule.ts
 ┃ ┣ 📜site.ts
 ┃ ┗ 📜wsParams.ts
 ┗ 📂utils
 ┃ ┣ 📜common.ts
 ┃ ┣ 📜filteredDuplicateTime.ts
 ┃ ┣ 📜layoredSort.ts
 ┃ ┣ 📜mappingIdFromIndex.ts
 ┃ ┗ 📜valueFilterByKey.ts
 ```
