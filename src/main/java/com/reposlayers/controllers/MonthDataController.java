package com.reposlayers.controllers;


import com.reposlayers.models.MonthData;
import com.reposlayers.repositories.MonthDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/monthdata")
public class MonthDataController {

    private MonthDataRepository moRepo;

    @Autowired
    public MonthDataController(MonthDataRepository moRepo){this.moRepo=moRepo;}

    @GetMapping
    public List<MonthData> getAllMonths(){return moRepo.findAll();}

}
