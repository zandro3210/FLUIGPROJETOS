function createDataset(fields, constraints, sortFields) {
    var newDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/Kace/";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    var myQuery = "SELECT OS_NAME, MACHINE.IP, MACHINE.NAME AS SYSTEM_NAME, OS_VERSION, PROCESSORS, RAM_TOTAL, round(SUM(MACHINE_DISKS.DISK_USED),2) " +
    		"AS MACHINE_DISKS_DISK_USED, MACHINE_DCM_PHYSICAL_MEMORY.SERIAL_NUMBER, (SELECT MACHINE_CUSTOM_INVENTORY.STR_FIELD_VALUE FROM MACHINE_CUSTOM_INVENTORY WHERE MACHINE_CUSTOM_INVENTORY.ID=MACHINE.ID AND MACHINE_CUSTOM_INVENTORY.SOFTWARE_ID=19472) " +
    		"AS MACHINE_CUSTOM_INVENTORY_0_19472, MACHINE.CLIENT_VERSION, OS_INSTALLED_DATE, ASSET_OWNER.DOMAIN, ASSET_OWNER_LOCALE.DESCRIPTION FROM MACHINE  LEFT JOIN MACHINE_DISKS ON (MACHINE_DISKS.ID = MACHINE.ID) " +
    		"LEFT JOIN MACHINE_DCM_PHYSICAL_MEMORY ON (MACHINE_DCM_PHYSICAL_MEMORY.ID = MACHINE.ID)  LEFT JOIN ASSET ON ASSET.MAPPED_ID = MACHINE.ID AND ASSET.ASSET_TYPE_ID=5 LEFT JOIN USER ASSET_OWNER ON ASSET_OWNER.ID = ASSET.OWNER_ID " +
    		"LEFT JOIN KBSYS.LOCALE_BROWSER ASSET_OWNER_LOCALE ON ASSET_OWNER_LOCALE.ID = ASSET_OWNER.LOCALE_BROWSER_ID   GROUP BY MACHINE.ID ORDER BY OS_NAME";
    
    log.info("myQuery KACE " + myQuery);
    
    try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                	
                	if (rs.getMetaData().getColumnName(i) == "NAME") {
                		newDataset.addColumn("SYSTEM_NAME");
                		continue;
                	} 
                	newDataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            var Arr = new Array();
            for (var i = 1; i <= columnCount; i++) {
            	if (rs.getMetaData().getColumnName(i) == "NAME") {
                    var obj = rs.getObject("SYSTEM_NAME");
            	} else {
                    var obj = rs.getObject(rs.getMetaData().getColumnName(i));
            	}
            	
                if (null != obj) {
                	if (rs.getMetaData().getColumnName(i).toString() == "NAME") {
                		Arr[i - 1] = rs.getObject("SYSTEM_NAME").toString();
                	} else {
                		 Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                	}
                } else {
                    Arr[i - 1] = "";
                }
            }
            newDataset.addRow(Arr);
        }
    } catch (e) {
        log.error("ERRO==============> " + e.message);
    } finally {
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    return newDataset;
}