# CHANGELOG
* Plugins
  * Introduced `iotronic_dependency` in create plugin modal form
  * Introduced inject plugin configuration
  * Introduced `iotronic_dependency` in plugin list and plugin update tables
  * Restyled `on boot` and `force` selections and introduced `on maintenance` in inject plugin
  * Fixed bug in filtering plugins using select menù:
    * `Actions` modal
    * `Inject` modal
    * `Remove from boards` modal
  * Fixed bug while removing plugin (new table showed with wrong columns)
  * Fixed minor issue while ordering the table columns in destroy plugin

  
* Board info
  * Added board `label` name in board info modal view
  * Added `latest_change` and `on_maintenance` columns into plugins table
  * Added `state` and `state_time` into details section
  * Introduced "Maintenance" panel with the possibility to change status and force the connection


* Left menù
  * Introduced maintenance actions under Boards menù
  * Added `lr_version`, `state` and `state_time` columns and removed `notify` in board list table

* Global improvements
  * Introduced markers for maintenance boards (homepage map and single board map) and relative logic
  * Fixed minor issue with project boards list showed in tables
  * Fixed minor issue with login page (now it is possible to press Enter button once written the password)