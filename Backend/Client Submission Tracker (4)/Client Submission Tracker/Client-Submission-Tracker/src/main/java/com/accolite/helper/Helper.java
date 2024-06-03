package com.accolite.helper;


import com.accolite.entities.Candidate;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Helper {
    //checll file is of excel type of not
    public static boolean checkExcelFormat(MultipartFile file){
        String contentType = file.getContentType();
        if(contentType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")){
            return true;
        }
        else {
            return false;
        }
    }
    //converts excel to list of products
    public static List<Candidate> convertExcelToListOfProduct(InputStream is) {
        List<Candidate> list = new ArrayList<>();
        try {
            XSSFWorkbook workbook = new XSSFWorkbook(is);
            XSSFSheet sheet = workbook.getSheet("Sheet1");

            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    // Skip header row
                    continue;
                }

                Candidate candidate = new Candidate();
                for (Cell cell : row) {
                    int columnIndex = cell.getColumnIndex();
                    switch (columnIndex) {
                        case 0:
                            candidate.setCandidateId((int) cell.getNumericCellValue());
                            break;
                        case 1:
                            candidate.setCandidateEmail(cell.getStringCellValue());
                            break;
                        case 2:
                            candidate.setCandidateName(cell.getStringCellValue());
                            break;
                        case 3:
                            candidate.setCandidateStatus(cell.getStringCellValue());
                            break;
                        case 4:
                            if (cell.getCellType() == CellType.NUMERIC) {
                                candidate.setExperience((int) cell.getNumericCellValue());
                            }
                            break;
                        case 5:
                            candidate.setIsAccoliteEmployee(cell.getStringCellValue());
                            break;
                        case 6:
                            if (cell.getCellType() == CellType.BOOLEAN) {
                                candidate.setIsDeleted(cell.getBooleanCellValue());
                            }
                            break;
                        case 7:
                            if (cell.getCellType() == CellType.NUMERIC) {
                                candidate.setLast_working_day(cell.getDateCellValue());
                            }
                            break;
                        default:
                            // Handle other columns if necessary
                            break;
                    }
                }
                list.add(candidate);
            }
            workbook.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return list;
    }

}

