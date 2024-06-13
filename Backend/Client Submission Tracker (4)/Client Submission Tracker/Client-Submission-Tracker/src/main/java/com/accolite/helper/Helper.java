package com.accolite.helper;


import com.accolite.entities.Candidate;
import com.accolite.entities.CandidateSkill;
import com.accolite.repository.CandidateSkillRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
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
    public  static List<Candidate> convertExcelToListOfProduct(InputStream is, CandidateSkillRepository candidateSkillRepository) {
        List<Candidate> list = new ArrayList<>();
        List<CandidateSkill> list1 = new ArrayList<>();
        try {
            XSSFWorkbook workbook = new XSSFWorkbook(is);
            XSSFSheet sheet = workbook.getSheet("Sheet1");

            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    // Skip header row
                    continue;
                }

                Candidate candidate = new Candidate();

                CandidateSkill candidateSkill = new CandidateSkill();
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
                            String skills1= cell.getStringCellValue();
                            System.out.println(skills1);
                            String[] skills=skills1.split(",");
                            System.out.println(Arrays.toString(skills));
                            for(int i=0;i<skills.length;i++) {

                                if (candidateSkillRepository.existsBySkill(skills[i])) {

                                    CandidateSkill candidateSkill1 = candidateSkillRepository.findBySkills(skills[i]);
                                    List<CandidateSkill> candidateSkills = new ArrayList<>();
                                    candidateSkills.add(candidateSkill1);
                                    candidate.setSkills(candidateSkills);
                                } else {
                                    CandidateSkill candidateSkill1 = new CandidateSkill();
                                    candidateSkill1.setSkill(skills[i]);
                                    candidateSkillRepository.save(candidateSkill);
                                    if (candidate.getSkills() == null) {
                                        List<CandidateSkill> candidateSkills = new ArrayList<>();
                                        candidateSkills.add(candidateSkill1);
                                        candidate.setSkills(candidateSkills);
                                    }
                                }
                            }
                            break;


                        case 6:
                            candidate.setIsAccoliteEmployee(cell.getStringCellValue());
                            break;
                        case 7:
                            if (cell.getCellType() == CellType.BOOLEAN) {
                                candidate.setIsDeleted(cell.getBooleanCellValue());
                            }
                            break;

                        case 8:
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

