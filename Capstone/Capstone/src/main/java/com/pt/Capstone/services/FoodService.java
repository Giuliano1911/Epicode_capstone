package com.pt.Capstone.services;

import com.pt.Capstone.entities.Food;
import com.pt.Capstone.repositories.FoodRepository;
import com.pt.Capstone.requests.FoodRequest;
import com.pt.Capstone.responses.EntityPostResponse;
import com.pt.Capstone.responses.FoodResponse;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@RequiredArgsConstructor
@Validated
public class FoodService {

    private final FoodRepository foodRepository;

    public FoodResponse foodResponseFromEntity(Food food) {
        FoodResponse foodResponse = new FoodResponse();
        BeanUtils.copyProperties(food, foodResponse);
        return foodResponse;
    }

    public List<FoodResponse> foodResponseListFromEntityList(List<Food> foods) {
        return foods.stream().map(this::foodResponseFromEntity).toList();
    }

    public List<FoodResponse> findAll() {
        return foodResponseListFromEntityList(foodRepository.findAll());
    }

    public FoodResponse findById(Long id) {
        return foodResponseFromEntity(foodRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Food with id: " + id + " not found.")));
    }

    public Food foodFromPostRequest(FoodRequest foodRequest) {
        Food food = new Food();
        BeanUtils.copyProperties(foodRequest, food);
        return food;
    }

    public EntityPostResponse save(FoodRequest foodRequest) {
        if(foodRepository.existsByName(foodRequest.getName()))
            throw new EntityExistsException("Food with name: " + foodRequest.getName() + " already exists.");
        Food food = foodFromPostRequest(foodRequest);
        foodRepository.save(food);
        return new EntityPostResponse(food.getId());
    }

    public FoodResponse update(Long id, FoodRequest foodRequest) {
        Food food = foodFromPostRequest(foodRequest);
        food.setId(id);
        return foodResponseFromEntity(foodRepository.save(food));
    }

    public void delete(Long id) {
        foodRepository.deleteById(id);
    }
}
