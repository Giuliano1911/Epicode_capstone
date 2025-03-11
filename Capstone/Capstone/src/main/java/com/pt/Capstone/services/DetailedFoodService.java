package com.pt.Capstone.services;

import com.pt.Capstone.entities.DetailedFood;
import com.pt.Capstone.entities.DietDay;
import com.pt.Capstone.entities.Meal;
import com.pt.Capstone.repositories.DetailedFoodRepository;
import com.pt.Capstone.repositories.DietDayRepository;
import com.pt.Capstone.repositories.FoodRepository;
import com.pt.Capstone.repositories.MealRepository;
import com.pt.Capstone.requests.DetailedFoodRequest;
import com.pt.Capstone.responses.DetailedFoodResponse;
import com.pt.Capstone.responses.EntityPostResponse;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

@Service
@RequiredArgsConstructor
@Validated
public class DetailedFoodService {
    private final DetailedFoodRepository detailedFoodRepository;
    private final FoodRepository foodRepository;
    private final MealRepository mealRepository;
    private final DietDayRepository dietDayRepository;

    public DetailedFoodResponse DetailedFoodResponseFromDetailedFood(DetailedFood detailedFood) {
        DetailedFoodResponse detailedFoodResponse = new DetailedFoodResponse();
        BeanUtils.copyProperties(detailedFood, detailedFoodResponse);
        return detailedFoodResponse;
    }

    public DetailedFoodResponse findById(Long id) {
        DetailedFood detailedFood = detailedFoodRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("DetailedFood with id: " + id + " not found"));
        return DetailedFoodResponseFromDetailedFood(detailedFood);
    }

    public EntityPostResponse save(Long mealId, Long dietDayId, @Valid DetailedFoodRequest detailedFoodRequest) {
        Meal meal = mealRepository.findById(mealId).orElseThrow(() -> new EntityNotFoundException("Meal with id: " + mealId + " not found"));
        DietDay dietDay = dietDayRepository.findById(dietDayId).orElseThrow(() -> new EntityNotFoundException("DietDay with id: " + dietDayId + " not found"));
        DetailedFood detailedFood = new DetailedFood();
        BeanUtils.copyProperties(detailedFoodRequest, detailedFood);
        detailedFoodRepository.save(detailedFood);
        meal.getDetailedFoods().add(detailedFood);
        mealRepository.save(meal);
        dietDay.getMeals().add(meal);
        dietDayRepository.save(dietDay);
        return new EntityPostResponse(detailedFood.getId());
    }

    public void update(Long id, @Valid DetailedFoodRequest detailedFoodRequest) {
        DetailedFood detailedFood = detailedFoodRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("DetailedFood with id: " + id + " not found"));
        BeanUtils.copyProperties(detailedFoodRequest, detailedFood);
        detailedFood.setFood(foodRepository.findById(detailedFoodRequest.getFoodId()).orElseThrow(() -> new EntityNotFoundException("Food with id: " + detailedFoodRequest.getFoodId() + " not found")));
        detailedFoodRepository.save(detailedFood);
    }

    public void delete(Long id) {
        detailedFoodRepository.deleteById(id);
    }
}
